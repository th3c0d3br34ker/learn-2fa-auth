import Image from 'next/image';
import { redirect } from 'next/navigation';
import { getSession } from '../api-lib/actions';

const ProtectedPage = async () => {
  const session = await getSession();

  if (!session.is_authenticated) {
    redirect('/auth/login');
  }

  const user = {
    email: session.email,
  };

  return (
    <div className='max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8'>
      <div className='max-w-3xl mx-auto'>
        <h1 className='text-3xl font-extrabold text-center text-transparent sm:text-5xl bg-clip-text bg-gradient-to-r from-indigo-300 to-blue-500'>
          Two-Factor Authentication
        </h1>
        <p className='max-w-md mx-auto mt-4 text-center text-gray-500'>
          This is a protected page. You need to be logged in to see this page.
        </p>

        <div className='p-8 mt-6 mb-0 space-y-4 rounded-lg shadow-2xl'>
          <label htmlFor='email' className='text-sm font-medium'>
            Email
          </label>
          <div className='relative mt-1'>
            <input
              type='email'
              id='email'
              name='email'
              className='w-full p-4 pr-12 text-sm rounded-lg shadow-lg'
              defaultValue={user.email}
              disabled
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
      </div>
    </div>
  );
};

export default ProtectedPage;
