/* eslint-disable @next/next/no-img-element */
import { useRef } from 'react';
import { sessionOptions } from 'lib/session';
import { withIronSessionSsr } from 'iron-session/next';

// project imports
import Layout from 'container/layout';
import { API_URI } from 'lib/config';

const CodeInput = ({ id, name, inputRef }) => {
  const handleKeyDown = (event) => {
    const keyValue = event.key;

    if (!/^\d+$/.test(keyValue)) {
      event.preventDefault();
    }
    if (event.key === 'Backspace') {
      // Backspace key was pressed
      event.currentTarget.value = '';

      // Input field is empty, move focus to previous input field
      event.preventDefault();
      const prevInput = event.currentTarget.previousElementSibling;
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  const handleInput = (event) => {
    const input = event.currentTarget;
    if (input.selectionEnd === input.value.length) {
      // Input field is full, move focus to next input field
      const nextInput = input.nextElementSibling;
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  return (
    <input
      type='text'
      className='w-12 h-12 m-2 text-center text-2xl font-bold text-gray-900 bg-gray-100 border-2 border-gray-300 rounded-md shadow-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
      id={id}
      name={name}
      maxLength='1'
      ref={inputRef}
      onKeyDown={handleKeyDown}
      onInput={handleInput}
      required
    />
  );
};

const SetUp2FA = ({ email, qrCode }) => {
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];

  return (
    <Layout title='Set Up 2FA'>
      <div className='max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8'>
        <div className='max-w-3xl mx-auto'>
          <h1 className='text-3xl font-extrabold text-center text-transparent sm:text-5xl bg-clip-text bg-gradient-to-r from-indigo-300 to-blue-500'>
            2FA Authenticator
          </h1>

          <div className='flex flex-row items-center justify-center rounded-lg shadow-2xl mt-6'>
            <form action='/api/sign-up-2fa' method='POST' className='mx-auto px-6 py-8 w-7/12'>
              <p className='text-lg font-medium'>Sign Up - Set 2FA</p>
              <p className='max-w-md mx-auto text-center text-gray-500'>
                Scan the QR Code in the Authenticator app then enter the code that you see in the app in the text field
                and click Submit.
              </p>

              <input type='email' className='form-control' id='email' name='email' defaultValue={email} hidden />

              <div>
                <label htmlFor='code' className='text-sm font-medium'>
                  Code
                </label>
                <div className='relative mt-1'>
                  <div className='flex justify-center m-2'>
                    <CodeInput id='digit1' name='digit1' inputRef={inputRefs[0]} />
                    <CodeInput id='digit2' name='digit2' inputRef={inputRefs[1]} />
                    <CodeInput id='digit3' name='digit3' inputRef={inputRefs[2]} />
                    <CodeInput id='digit4' name='digit4' inputRef={inputRefs[3]} />
                    <CodeInput id='digit5' name='digit5' inputRef={inputRefs[4]} />
                    <CodeInput id='digit6' name='digit6' inputRef={inputRefs[5]} />
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

            <div class='w-1/2 mx-auto bg-indigo-400 rounded-lg p-8'>
              <img src={qrCode} alt='qr-code' class='w-full rounded-lg border-4 border-indigo-600 shadow-lg' />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const myGetServerSideProps = async ({ req }) => {
  const user = req.session.user;

  if (!user) {
    return {
      redirect: {
        destination: '/auth/signup',
      },
    };
  }

  const { email } = req.session.user;

  const response = await fetch(`${API_URI}/api/get-2fa-qrcode?email=${email}`);

  const data = await response.json();

  if (data.success) {
    return {
      props: {
        email,
        qrCode: data.qrCode,
      },
    };
  }

  return {
    redirect: {
      destination: data.fallback,
    },
  };
};

export const getServerSideProps = withIronSessionSsr(myGetServerSideProps, sessionOptions);

export default SetUp2FA;
