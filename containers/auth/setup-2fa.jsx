import { redirect } from 'next/navigation';
import { getSession, setUp2FA } from '../../app/api-lib/actions';
import PinInput from '../../components/pin-input';

/* eslint-disable @next/next/no-img-element */
const SetUpTwoFactorPage = async ({ qrCode }) => {
  const session = await getSession();

  if (!session.email) {
    redirect('/auth/signup');
  }

  if (session.is_authenticated) {
    redirect('/protected');
  }

  return (
    <div className='max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8'>
      <div className='max-w-3xl mx-auto'>
        <h1 className='text-3xl font-extrabold text-center text-transparent sm:text-5xl bg-clip-text bg-gradient-to-r from-indigo-300 to-blue-500'>
          2FA Authenticator
        </h1>

        <div className='flex flex-row items-center justify-center rounded-lg shadow-2xl mt-6'>
          <form action={setUp2FA} className='mx-auto px-6 py-8 w-7/12'>
            <p className='text-lg font-medium'>Sign Up - Set 2FA</p>
            <p className='max-w-md mx-auto my-2 text-gray-500'>
              Scan the QR Code in the Authenticator app then enter the code that
              you see in the app in the text field and click Submit.
            </p>

            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              defaultValue={session.email}
              hidden
            />

            <div>
              <label htmlFor='code' className='text-sm font-medium'>
                Code
              </label>
              <div className='relative mt-1'>
                <div className='flex justify-center m-2'>
                  <PinInput id='digit1' name='digit1' key={0} />
                  <PinInput id='digit2' name='digit2' key={1} />
                  <PinInput id='digit3' name='digit3' key={2} />
                  <PinInput id='digit4' name='digit4' key={3} />
                  <PinInput id='digit5' name='digit5' key={4} />
                  <PinInput id='digit6' name='digit6' key={5} />
                </div>
              </div>
            </div>

            <button
              type='submit'
              className='block w-full px-5 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg'
            >
              Submit
            </button>
          </form>

          <div className='w-1/2 mx-auto bg-indigo-400 rounded-lg p-8'>
            <img
              src={qrCode}
              alt='qr-code'
              className='w-full rounded-lg border-4 border-indigo-600 shadow-lg'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetUpTwoFactorPage;
