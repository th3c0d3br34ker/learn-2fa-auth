import Link from "next/link";
import Image from "next/image";

// project imports
import Layout from "container/layout";

const SignUpPage = () => (
  <Layout title="Sign up" header>
    <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-extrabold text-center text-transparent sm:text-5xl bg-clip-text bg-gradient-to-r from-indigo-300 to-blue-500">
          Two-Factor Authentication
        </h1>
        <form
          action="/api/sign-up"
          method="POST"
          className="p-8 mt-6 mb-0 space-y-4 rounded-lg shadow-2xl"
        >
          <p className="text-lg font-medium">Sign Up for a new account</p>

          <div className="sm:flex">
            <div className="relative mt-1 w-full p-3 sm:flex-1">
              <label htmlFor="email" className="text-sm font-medium sr-only">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full p-4 pr-12 text-sm rounded-lg shadow-lg"
                placeholder="Enter Email"
                autoFocus
                required
              />
              <span className="absolute inset-y-0 inline-flex items-center right-8">
                <Image
                  src="/icons/email.svg"
                  width={16}
                  height={16}
                  alt="email-symbol"
                />
              </span>
            </div>

            <button
              type="submit"
              className="flex items-center justify-between my-4 w-full sm:w-auto px-5 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg shadow-lg"
            >
              Sign Up
            </button>
          </div>

          <p className="text-sm text-center text-gray-500">
            Have an account?{" "}
            <Link href="/auth/login">
              <a className="underline text-indigo-700 font-bold">Login</a>
            </Link>
          </p>
        </form>
      </div>
    </div>
  </Layout>
);

export default SignUpPage;
