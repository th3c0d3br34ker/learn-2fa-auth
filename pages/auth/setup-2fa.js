/* eslint-disable @next/next/no-img-element */
import { sessionOptions } from "lib/session";
import { withIronSessionSsr } from "iron-session/next";

// project imports
import Layout from "container/layout";
import { API_URI } from "lib/config";

const SetUp2FA = ({ email, qrCode }) => {
  return (
    <Layout title="Set Up 2FA">
      <div className="container mx-auto mt-4">
        <h1>Sign Up - Set 2FA</h1>
        <form action="/api/sign-up-2fa" method="POST">
          <p>
            Scan the QR Code in the Authenticator app then enter the code that
            you see in the app in the text field and click Submit.
          </p>
          <h4>Authenticating... {email}</h4>
          <img src={qrCode} alt="" className="img-fluid" />
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              defaultValue={email}
              hidden
            />
            <label htmlFor="code" className="form-label">
              2FA Code
            </label>
            <input
              type="text"
              className="form-control"
              id="code"
              name="code"
              autoFocus
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

const myGetServerSideProps = async ({ req }) => {
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
