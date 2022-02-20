import Link from "next/link";
import Image from "next/image";
import { withIronSessionSsr } from "iron-session/next";

// project imports
import { sessionOptions } from "lib/session";
import Layout from "container/layout";

const IndexPage = ({ user }) => (
  <Layout title="Home">
    <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-center text-indigo-600 sm:text-3xl">
          2FA Authenticator
        </h1>
        <p className="max-w-md mx-auto mt-4 text-center text-gray-500">
          This is an Example site for 2FA Login.
        </p>

        <div className="p-8 mt-6 mb-0 space-y-4 rounded-lg shadow-2xl">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <div className="relative mt-1">
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-4 pr-12 text-sm rounded-lg shadow-lg"
              defaultValue={user.email}
              disabled
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

          <Link href="/api/logout">
            <a className="block w-full px-5 py-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg">
              Log Out
            </a>
          </Link>
        </div>
      </div>
    </div>
  </Layout>
);

const myGetServerSideProps = async ({ req, res }) => {
  const user = req.session.user;

  if (user === undefined) {
    res.setHeader("location", "/auth/login");
    res.statusCode = 302;
    res.end();
    return {
      props: {
        user: { isLoggedIn: false, login: "", avatarUrl: "" },
      },
    };
  }

  return {
    props: { user: req.session.user },
  };
};

export const getServerSideProps = withIronSessionSsr(
  myGetServerSideProps,
  sessionOptions
);

export default IndexPage;
