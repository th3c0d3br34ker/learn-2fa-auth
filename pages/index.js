import Link from "next/link";

const IndexPage = ({ email }) => (
  <div>
    <h1>Hello, {email} </h1>
    <Link href="/">Log Out</Link>
  </div>
);

export async function getServerSideProps({ query }) {
  const { email } = query;

  if (email) {
    return {
      props: {
        email,
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
