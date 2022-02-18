import Link from "next/link";
import Layout from "container/layout";

const LogInPage = () => (
  <Layout title="Log In">
    <div className="container mx-auto mt-4">
      <h1>Log In</h1>
      <form action="/api/auth/login" method="POST">
        <p>
          Open the Authenticator App and enter the code that you see in the app
          in the text field and click Log In.
        </p>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="code" className="form-label">
            Code
          </label>
          <input type="code" className="form-control" id="code" name="code" />
        </div>
        <button type="submit" className="btn btn-primary">
          Log In
        </button>
      </form>
      <p className="mt-4">
        Don&apos;t have an account? <Link href="/auth/signup">Sign Up</Link>
      </p>
    </div>
  </Layout>
);

export default LogInPage;
