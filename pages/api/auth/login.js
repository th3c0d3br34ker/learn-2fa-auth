import { getUserWithEmail } from "api-lib/database/user";
import { database, session } from "api-lib/middlerwares";
import nextConnect from "next-connect";
import { authenticator } from "otplib";

const handler = nextConnect();

handler.use(database);
handler.use(session);

handler.post(async (req, res) => {
  const { email, code } = req.body;

  const db = req.db;

  const user = await getUserWithEmail(db, { email });

  if (!user) {
    return res.status(404).end();
  }

  if (!authenticator.check(code, user.secret)) {
    return res.status(401).end();
  }

  req.session.user = user;

  res.status(200).send({
    success: true,
    message: "Successfully Signed Up!",
    data: JSON.stringify(user),
  });
});

export default handler;
