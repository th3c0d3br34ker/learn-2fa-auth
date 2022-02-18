import { getUserWithEmail } from "api-lib/database/user";
import nextConnect from "next-connect";
import { authenticator } from "otplib";

const handler = nextConnect();

handler.use(database);
handler.use(session);

handler.post(async (req, res) => {
  const { email, code } = req.body;

  const db = req.db;

  console.log("Session Email:", req.session.email);

  // if (req.session.email && req.session.email !== email) {
  //   return res.status(400).json({
  //     success: false,
  //     message: "Invalid Session!",
  //   });
  // }

  const user = await getUserWithEmail(db, { email });

  if (!authenticator.check(code, user.secret)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Code!",
    });
  }

  req.session.email = null;
  req.session.user = user;

  res.status(200).send({
    success: true,
    message: "Successfully Signed Up!",
    data: JSON.stringify(user),
  });
});

export default handler;
