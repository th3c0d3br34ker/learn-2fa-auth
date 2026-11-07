import SetUpTwoFactorPage from '../../../containers/auth/setup-2fa';
import SignUpPage from '../../../containers/auth/signup';

export default async function SignUp({ params }) {
  const { signup } = await params;

  const step =
    Array.isArray(signup) && signup.length === 2 ? signup[1] : 'register';

  switch (step) {
    case 'register':
      return <SignUpPage />;

    case 'setup-2fa':
      return <SetUpTwoFactorPage />;
  }
}
