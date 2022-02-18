import { getUserWithEmail, insertUser } from "api-lib/database/user";
import { database, session } from "api-lib/middlerwares";
import nextConnect from "next-connect";
import { authenticator } from "otplib";

const handler = nextConnect();

handler.use(database);
handler.use(session);

handler.post(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Email is required",
    });
  }

  const db = req.db;

  const existingUser = await getUserWithEmail(db, { email });

  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "User already exists",
    });
  }

  const secret = authenticator.generateSecret();

  await insertUser(db, { email, secret });

  req.session.email = email;
  req.statusCode = 200;
  res.json({
    success: true,
    message: "Successfully Signed Up!",
  });
});

export default handler;
