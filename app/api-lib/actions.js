import { getIronSession } from 'iron-session';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { defaultSession, sessionOptions } from '../../helpers/lib';

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

  if (formData.get('code') === process.env.NEXT_PUBLIC_AUTH_CODE) {
    session.is_authenticated = true;
  }

  await session.save();
  revalidatePath('/auth/login');
}

/** @param {FormData} formData */
export async function signUp(formData) {
  'use server';

  const session = await getSession();

  session.email = formData.get('email');

  await session.save();
  revalidatePath('/signup/setup-2fa');
}

/** @param {FormData} formData */
export async function setUp2FA(formData) {
  'use server';

  const session = await getSession();

  if (!session.email) {
    revalidatePath('/signup');
  }

  if (session.email !== formData.get('email')) {
    session.email = formData.get('email');
  }

  session.code = Array.from({ length: 6 }, (_, i) =>
    formData.get(`digit${i + 1}`)
  ).join('');

  session.is_authenticated = true;

  await session.save();
  revalidatePath('/signup/setup-2fa');
}

export async function logout() {
  'use server'

  const session = await getSession();

  if (session.is_authenticated) {
    session.is_authenticated = false;
    await session.destroy();
  }

}
