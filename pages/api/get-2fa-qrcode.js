import { authenticator } from 'otplib';
import QRCode from 'qrcode';

// project imports
import { getUserWithEmail } from 'api-lib/database/user';
import { connectToDatabase } from 'api-lib/middlewares/database';
// import { sessionOptions } from 'lib/session';

const get2FAQRCodeApiRoute = async (req, res) => {
  try {
    const email = req.query.email;

    const db = await connectToDatabase();

    const user = await getUserWithEmail(db, { email });

    if (!user) {
      return res.json({ success: false, fallback: '/' });
    }

    console.log('user', user);

    const keyuri = authenticator.keyuri(email, '2FA Server', user.secret);

    const qrCodeUrl = await QRCode.toDataURL(keyuri);

    return res.json({ success: true, qrCode: qrCodeUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
    });
  }
};

export default get2FAQRCodeApiRoute;
