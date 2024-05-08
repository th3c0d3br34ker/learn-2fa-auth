import { getIronSession } from 'iron-session';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { defaultSession, sessionOptions } from '../../helpers/config';
import { createUser, verifyCode } from '../../prisma/lib';

export async function getSession() {
  const session = await getIronSession(cookies(), sessionOptions);

  if (!session) {
    Object.assign(session, defaultSession);
  }

  return session;
}

/** @param {FormData} formData */
export async function login(formData) {
  'use server';

  const session = await getSession();

  session.email = formData.get('email');

  session.is_authenticated = await verifyCode({
    email: session.email,
    code: formData.get('code'),
  });

  await session.save();
  revalidatePath('/auth/login');
}

/** @param {FormData} formData */
export async function signUp(formData) {
  'use server';

  const session = await getSession();

  const email = formData.get('email');

  session.email = email;

  await createUser({ email });

  await session.save();
  revalidatePath('/signup/setup-2fa');
}

/** @param {FormData} formData */
export async function setUp2FA(userEmail, formData) {
  'use server';

  const session = await getSession();

  if (!session.email) {
    revalidatePath('/signup');
  }

  if (session.email !== userEmail) {
    throw new Error('Unauthorized');
  }

  session.code = Array.from({ length: 6 }, (_, i) =>
    formData.get(`digit${i + 1}`)
  ).join('');

  session.is_authenticated = await verifyCode({
    email: session.email,
    code: session.code,
  });

  await session.save();
  revalidatePath('/signup/setup-2fa');
}

export async function logout() {
  'use server';

  const session = await getSession();

  if (session.is_authenticated) {
    session.is_authenticated = false;
    await session.destroy();
  }
}
