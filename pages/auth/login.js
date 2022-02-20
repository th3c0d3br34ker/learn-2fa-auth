import Link from "next/link";
import Image from "next/image";

// project imports
import Layout from "container/layout";

const LogInPage = () => (
  <Layout title="Log In">
    <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-center text-indigo-600 sm:text-3xl">
          2FA Authenticator
        </h1>

        <p className="max-w-md mx-auto mt-4 text-center text-gray-500">
          Open the Authenticator App and enter the code that you see in the app
          in the text field and click Log In.
        </p>
        <form
          action="/api/login"
          method="POST"
          className="p-8 mt-6 mb-0 space-y-4 rounded-lg shadow-2xl"
        >
          <p className="text-lg font-medium">Log in to your account</p>
          <div>
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <div className="relative mt-1">
              <input
                type="email"
                id="email"
                name="email"
                className="w-full p-4 pr-12 text-sm rounded-lg shadow-lg"
                placeholder="Enter Email"
                required
                autoFocus
              />
              <span className="absolute inset-y-0 inline-flex items-center right-4">
                <Image
                  src="/icons/email.svg"
                  width={16}
                  height={16}
                  alt="email-symbol"
                />
              </span>
            </div>
          </div>

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
            Log In
          </button>

          <p className="text-sm text-center text-gray-500">
            Don&apos;t have an account?{" "}
            <Link href="/auth/signup">
              <a className="underline text-indigo-900 font-bold">Sign Up</a>
            </Link>
          </p>
        </form>
      </div>
    </div>
  </Layout>
);

export default LogInPage;
