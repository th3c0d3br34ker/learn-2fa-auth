import Image from 'next/image';
import Link from 'next/link';

const Header = ({ isLoggedIn }) => (
  <header className='shadow-sm'>
    <div className='max-w-screen-xl p-4 mx-auto'>
      <div className='flex items-center justify-between space-x-4 lg:space-x-10'>
        <div className='flex lg:w-0 lg:flex-1'>
          <Image
            src='/icons/qr-code.svg'
            width={24}
            height={24}
            alt='icon'
            priority={false}
          />
        </div>

        {isLoggedIn ? (
          <Link
            href='/api/logout'
            className='px-5 py-2 text-sm font-medium text-white bg-red-500 rounded-lg'
            prefetch={false}
          >
            Log Out
          </Link>
        ) : (
          <div className='items-center justify-end flex-1 hidden space-x-4 sm:flex'>
            <Link
              href='/auth/login'
              className='px-5 py-2 text-sm font-medium text-blue-600 bg-gray-100 rounded-lg border-2 border-blue-600'
              prefetch={false}
            >
              Log in
            </Link>

            <Link
              href='/auth/signup'
              className='px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg'
              prefetch={false}
            >
              Sign up
            </Link>
          </div>
        )}
      </div>
    </div>
  </header>
);

export default Header;
