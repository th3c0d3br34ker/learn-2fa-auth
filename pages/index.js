import Link from "next/link";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "lib/session";

const IndexPage = ({ user }) => (
  <div>
    <h1>
      Hello,
      <br />
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </h1>
    <Link href="/api/logout">Log Out</Link>
  </div>
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
