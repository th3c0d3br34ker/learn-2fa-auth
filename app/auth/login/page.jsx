import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSession, login } from '../actions';

const LogInPage = async () => {
  const session = await getSession();

  if (session.is_authenticated) {
    redirect('/private');
  }

  return (
    <div className='max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8'>
      <div className='max-w-3xl mx-auto'>
        <h1 className='text-3xl font-extrabold text-center text-transparent sm:text-5xl bg-clip-text bg-gradient-to-r from-indigo-300 to-blue-500'>
          2FA Authenticator
        </h1>

        <p className='max-w-md mx-auto mt-4 text-center text-gray-500'>
          Open the Authenticator App and enter the code that you see in the app
          in the text field and click Log In.
        </p>

        <form
          action={login}
          className='p-8 mt-6 mb-0 space-y-4 rounded-lg shadow-2xl'
        >
          <p className='text-lg font-medium'>Log in to your account</p>
          <div>
            <label htmlFor='email' className='text-sm font-medium'>
              Email
            </label>
            <div className='relative mt-1'>
              <input
                type='email'
                id='email'
                name='email'
                className='w-full p-4 pr-12 text-sm rounded-lg shadow-lg'
                placeholder='Enter Email'
                required
                autoFocus
              />
              <span className='absolute inset-y-0 inline-flex items-center right-4'>
                <Image
                  src='/icons/email.svg'
                  width={16}
                  height={16}
                  alt='email-symbol'
                />
              </span>
            </div>
          </div>

          <div>
            <label htmlFor='code' className='text-sm font-medium'>
              Code
            </label>
            <div className='relative mt-1'>
              <input
                type='text'
                className='w-full p-4 pr-12 text-sm rounded-lg shadow-lg'
                id='code'
                name='code'
                placeholder='Enter Code'
                required
              />
              <span className='absolute inset-y-0 inline-flex items-center right-4'>
                <Image
                  src='/icons/qr-code.svg'
                  width={16}
                  height={16}
                  alt='at-symbol'
                />
              </span>
            </div>
          </div>

          <div className='flex w-full justify-end'>
            <button
              type='submit'
              className='block px-5 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg'
            >
              Log In
            </button>
          </div>
        </form>

        <p className='text-sm text-center text-gray-500'>
          Don&apos;t have an account?{' '}
          <Link
            href='/auth/signup'
            className='underline text-indigo-700 font-bold'
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LogInPage;
