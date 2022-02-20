/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { sessionOptions } from "lib/session";
import { withIronSessionSsr } from "iron-session/next";

// project imports
import Layout from "container/layout";
import { API_URI } from "lib/config";

const SetUp2FA = ({ email, qrCode }) => {
  return (
    <Layout title="Set Up 2FA">
      <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold text-center text-indigo-600 sm:text-3xl">
            2FA Authenticator
          </h1>

          <div className="flex flex-row rounded-lg shadow-2xl mt-6">
            <form
              action="/api/sign-up-2fa"
              method="POST"
              className="px-6 py-8 mb-0 space-y-4 w-full"
            >
              <p className="text-lg font-medium">Sign Up - Set 2FA</p>
              <p className="max-w-md mx-auto text-center text-gray-500">
                Scan the QR Code in the Authenticator app then enter the code
                that you see in the app in the text field and click Submit.
              </p>

              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                defaultValue={email}
                hidden
              />

              <div>
                <label htmlFor="code" className="text-sm font-medium">
                  Code
                </label>
                <div className="relative mt-1">
                  <input
                    type="text"
                    className="w-full p-4 pr-12 text-sm rounded-lg shadow-lg"
                    id="code"
                    name="code"
                    placeholder="Enter Code"
                    required
                  />
                  <span className="absolute inset-y-0 inline-flex items-center right-4">
                    <Image
                      src="/icons/qr-code.svg"
                      width={16}
                      height={16}
                      alt="at-symbol"
                    />
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="block w-full px-5 py-3 text-sm font-medium text-white bg-indigo-600 rounded-lg"
              >
                Submit
              </button>
            </form>

            <div className="mx-auto w-full flex justify-center py-20 mb-0 rounded-lg bg-indigo-400">
              <img
                src={qrCode}
                alt="qr-code"
                width={160}
                className="rounded-lg border-4 border-indigo-600 shadow-lg"
              />
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
        destination: "/auth/signup",
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

export const getServerSideProps = withIronSessionSsr(
  myGetServerSideProps,
  sessionOptions
);

export default SetUp2FA;
