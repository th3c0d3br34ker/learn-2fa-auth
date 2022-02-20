import Link from "next/link";
import Image from "next/image";

// project imports
import Layout from "container/layout";

const SignUpPage = () => {
  return (
    <Layout title="Sign up">
      <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
        <div className="max-w-lg mx-auto">
          <h1 className="text-2xl font-bold text-center text-indigo-600 sm:text-3xl">
            2FA Authenticator
          </h1>
          <form
            action="/api/sign-up"
            method="POST"
            className="p-8 mt-6 mb-0 space-y-4 rounded-lg shadow-2xl"
          >
            <p className="text-lg font-medium">Sign Up for a new account</p>

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
                  autoFocus
                  required
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

            <button
              type="submit"
              className="block w-full px-5 py-3 text-sm font-medium text-white bg-indigo-600 rounded-lg"
            >
              Sign Up
            </button>
            <p className="text-sm text-center text-gray-500">
              Have an account?{" "}
              <Link href="/auth/login">
                <a className="underline text-indigo-900 font-bold">Login</a>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default SignUpPage;
