import Link from "next/link";
import Layout from "../../container/layout";

const SignUpPage = () => {
  return (
    <Layout title="Sign up">
      <div className="container mx-auto mt-4">
        <h1>Sign Up</h1>
        <form action="/api/sign-up" method="POST">
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
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </form>
        <p className="mt-4">
          Have an account? <Link href="/auth/login">Login</Link>
        </p>
      </div>
    </Layout>
  );
};

export default SignUpPage;
