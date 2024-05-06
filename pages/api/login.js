// import { getIronSession } from 'iron-session';

// project imports
import { getUserWithEmail } from 'api-lib/database/user';
import { connectToDatabase } from 'api-lib/middlewares/database';
// import { sessionOptions } from 'lib/session';
import { sanitizeUser, verifyUser } from 'api-lib/auth';

const loginApiRoute = async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({
        success: false,
        message: 'Email or Code is missing!',
      });
    }

    const db = await connectToDatabase();

    const user = await getUserWithEmail(db, { email });

    if (!user) {
      return res.status(404).end();
    }

    const isAuthenticated = verifyUser(user, code);

    if (!isAuthenticated) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Code!',
      });
    }

    req.session.user = sanitizeUser(user);
    await req.session.save();

    res.redirect('/private');
    res.end();
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
    });
  }
};

export default loginApiRoute;
