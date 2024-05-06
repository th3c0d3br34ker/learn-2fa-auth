import { withIronSessionApiRoute } from 'iron-session/next';

// project imports
import { sessionOptions } from 'lib/session';

const logoutApiRoute = async (req, res) => {
  try {
    req.session.destroy();

    res.redirect('/');
    res.end();
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
    });
  }
};

export default withIronSessionApiRoute(logoutApiRoute, sessionOptions);
