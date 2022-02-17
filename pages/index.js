import { getSession } from "../api-lib/next-session";

const IndexPage = ({ email }) => (
  <div>
    <h1>Hello, {email} </h1>
  </div>
);

export async function getServerSideProps({ query }) {
  const { email } = query;

  // if (email) {
  return {
    props: {
      email,
    },
  };
  // }

  // return {
  //   redirect: {
  //     destination: "/auth/login",
  //     permanent: false,
  //   },
  // };
}

export default IndexPage;
