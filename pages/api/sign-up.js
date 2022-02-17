import { authenticator } from "otplib";
// const QRCode = require("qrcode");

// project imports
import { connectDB } from "../../api-lib/database/db";
import { signup } from "../../api-lib/database/queries";

const handler = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.json({
      success: false,
      message: "Email is required",
    });
  }

  console.log("SignUp API: ", email);

  const db = connectDB();

  // const signupStatus = await signup(db, { email });

  // if (signupStatus.status) {
  //   QRCode.toDataURL(signupStatus.keyuri, (err, url) => {
  //     if (err) {
  //       console.log("ERROR: ", err);
  //     }

  //     return res.json({ email, url });
  //   });
  // }

  // return res.json({
  //   success: false,
  //   message: "Error while signing up",
  // });

  const secret = authenticator.generateSecret();

  db.serialize(() => {
    db.run(
      "INSERT INTO `users`(`email`, `secret`) VALUES (?, ?)",
      [email, secret],
      (err) => {
        if (err) {
          console.log("DATABASE_ERROR: ", err);
          insertStatus = {
            status: false,
            message: err.message,
          };

          res.json(insertStatus);
        }

        // QRCode.toDataURL(
        //   authenticator.keyuri(email, "2FA Server", secret),
        //   (err, url) => {
        //     if (err) {
        //       console.log("ERROR: ", err);
        //       return res.json({
        //         success: false,
        //         message: "Error while signing up",
        //       });
        //     }

        // }
        // );

        return res.redirect("/auth/setup-2fa?email=" + email);
      }
    );
  });
};

export default handler;
