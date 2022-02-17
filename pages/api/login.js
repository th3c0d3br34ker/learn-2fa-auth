import { connectDB } from "../../api-lib/database/db";
import { verifyLogin } from "../../api-lib/auth";

const handler = async (req, res) => {
  const { email, code } = req.body;

  const db = connectDB();

  return verifyLogin(db, { email, code }, { req, res });
};

export default handler;
