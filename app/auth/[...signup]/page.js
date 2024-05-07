import SetUpTwoFactorPage from '../../../pages/auth/setup-2fa';
import SignUpPage from '../../../pages/auth/signup';

export default function SignUp({ params }) {
  const { signup } = params;

  let step = null;

  if (Array.isArray(signup) && signup.length === 2) {
    step = signup.pop();
  }

  step = step || 'register';

  switch (step) {
    case 'register':
      return <SignUpPage />;

    case 'setup-2fa':
      return <SetUpTwoFactorPage />;
  }
}
