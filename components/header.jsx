import Image from 'next/image';
import Link from 'next/link';
import { getSession, logout } from '../app/api-lib/actions';

const Header = async () => {
  const session = await getSession();

  const isLoggedIn = session.is_authenticated ?? false;

  return (
    <header className='shadow-sm'>
      <div className='max-w-screen-xl p-4 mx-auto'>
        <div className='flex items-center justify-between space-x-4 lg:space-x-10'>
          <div className='flex lg:w-0 lg:flex-1'>
            <Image src='/icons/qr-code.svg' width={24} height={24} alt='icon' />
          </div>

          {isLoggedIn ? (
            <form action={logout}>
              <button className='px-5 py-2 text-sm font-medium text-white bg-red-500 rounded-lg'>
                Log Out
              </button>
            </form>
          ) : (
            <div className='items-center justify-end flex-1 hidden space-x-4 sm:flex'>
              <Link
                href='/auth/login'
                className='px-5 py-2 text-sm font-medium text-blue-600 bg-gray-100 rounded-lg border-2 border-blue-600'
              >
                Log in
              </Link>

              <Link
                href='/auth/signup'
                className='px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg'
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
