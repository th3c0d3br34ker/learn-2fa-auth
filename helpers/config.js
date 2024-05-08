import { SessionOptions } from 'iron-session';

/** @type {SessionOptions} */
export const sessionOptions = {
  password: process.env.SESSION_SECRET,
  cookieName: '2FA_SESSION',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};

/**
 * @typedef SessionData
 * @param {string} email
 * @param {code} code
 * @param {boolean} is_authenticated
 */

/** @type {SessionData} */
export const defaultSession = {
  email: '',
  code: '',
  is_authenticated: false,
};
