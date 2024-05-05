import { authenticator } from "otplib";
import { withIronSessionApiRoute } from "iron-session/next";

// project imports
import {
  deleteUser,
  getUserWithEmail,
  insertUser,
} from "api-lib/database/user";
import { connectToDatabase } from "api-lib/middlerwares/database";
import { sessionOptions } from "lib/session";
import { sanitizeUser } from "api-lib/auth";

const signUpApiRoute = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const db = await connectToDatabase();

    const existingUser = await getUserWithEmail(db, { email });

    if (existingUser) {
      // res.redirect("/auth/login");
      // res.end();

      await deleteUser(db, { email });
    }

    // create and save new user
    const secret = authenticator.generateSecret();

    const user = await insertUser(db, { email, secret });

    if (!user) {
      throw new Error("User not created");
    }

    req.session.user = sanitizeUser(user);
    await req.session.save();

    res.redirect("/auth/setup-2fa");
    res.end();
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export default withIronSessionApiRoute(signUpApiRoute, sessionOptions);
