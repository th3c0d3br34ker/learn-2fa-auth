import { getIronSession } from 'iron-session';

// project imports
import { sessionOptions } from 'lib/session';

const logoutApiRoute = async (req, res) => {
  try {
    const session = await getIronSession(req, res, sessionOptions);

    session.destroy();

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

export default logoutApiRoute;
