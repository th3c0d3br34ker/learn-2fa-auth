import nextConnect from "next-connect";
import { authenticator } from "otplib";
import QRCode from "qrcode";
import { database, session } from "api-lib/middlerwares";
import { getUserWithEmail } from "api-lib/database/user";

const handler = nextConnect();

handler.use(database);
handler.use(session);

handler.get(async (req, res) => {
  console.log("Session Email:", req.session.email);

  const { email } = req.session;

  const db = req.db;

  const user = await getUserWithEmail(db, { email });

  if (!user) {
    return res.json({ success: false, fallback: "/" });
  }

  const keyuri = authenticator.keyuri(email, "2FA Server", user.secret);

  const qrCodeUrl = await QRCode.toDataURL(keyuri);

  return res.json({ success: true, qrCode: qrCodeUrl });
});

export default handler;
