import Link from "next/link";

const IndexPage = ({ user }) => (
  <div>
    <h1>
      Hello,
      <br />
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </h1>
    <Link href="/">Log Out</Link>
  </div>
);

export async function getServerSideProps({ req }) {
  const { user } = req.session;

  if (user) {
    return {
      props: {
        user,
      },
    };
  }

  return {
    redirect: {
      destination: "/auth/login",
      permanent: true,
    },
  };
}

export default IndexPage;
