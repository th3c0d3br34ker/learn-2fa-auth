import { getSession } from "../../api-lib/next-session";
import Layout from "../../container/layout";

const SetUp2FA = ({ email, qrCode }) => {
  return (
    <Layout title="Set Up 2FA">
      <div className="container mx-auto mt-4">
        <h1>Sign Up - Set 2FA</h1>
        <form action="/api/login" method="POST">
          <p>
            Scan the QR Code in the Authenticator app then enter the code that
            you see in the app in the text field and click Submit.
          </p>
          <h1>Authenticating... {email}</h1>
          <img src={qrCode} className="img-fluid" />
          <div className="mb-3">
            <label htmlFor="code" className="form-label">
              2FA Code
            </label>
            <input hidden type="email" id="email" value={email} />
            <input type="text" className="form-control" id="code" name="code" />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export async function getServerSideProps({ query }) {
  const { email } = query;

  if (email) {
    const response = await fetch(
      "http://localhost:3000/api/get-2fa-qrcode?email=" + email
    );
    const { qrCode } = await response.json();

    return {
      props: {
        email,
        qrCode,
      },
    };
  }

  return {
    props: {
      email,
    },
  };

  // return {
  //   redirect: {
  //     destination: "/auth/signup",
  //     permanent: false,
  //   },
  // };
}

export default SetUp2FA;
