'use server';

import { authenticator } from 'otplib';
import QRCode from 'qrcode';

import db from './db';

/**
 * @param {object} params
 * @param {string} params.email
 * 
 * @returns {Promise<void>}
 */
export const createUser = async (params) => {
  const user = await db.user.upsert({
    where: { email: params.email },
    update: {},
    create: { email: params.email },
  });

  // create a new secret for the user
  const secret = authenticator.generateSecret();

  await db.otp.upsert({
    where: { userId: user.id },
    update: { secret },
    create: { secret, userId: user.id },
  });
};

/**
 * @param {object} params
 * @param {string} params.email
 * 
 * @returns {Promise<string>} the QR code Data URL
 */
export const generateQRCode = async (params) => {
  const user = await db.user.findUniqueOrThrow({
    where: { email: params.email },
    include: { otp: true },
  });

  return QRCode.toDataURL(
    authenticator.keyuri(user.email, '2FA Server', user.otp.secret)
  );
};

/**
 * @param {object} params
 * @param {string} params.email
 * @param {string} params.code
 * 
 * @returns {Promise<boolean>} true if the code is valid else false
 */
export const verifyCode = async (params) => {
  const user = await db.user.findUniqueOrThrow({
    where: { email: params.email },
    include: { otp: true },
  });

  return authenticator.verify({ token: params.code, secret: user.otp.secret });
}
