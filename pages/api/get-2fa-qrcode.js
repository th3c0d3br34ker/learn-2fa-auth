import { authenticator } from "otplib";
const QRCode = require("qrcode");

// project imports
import { connectDB } from "../../api-lib/database/db";

const handler = (req, res) => {
  const { email } = req.query;

  const db = connectDB();

  db.serialize(() => {
    db.get("SELECT secret FROM users WHERE email = ?", [email], (err, row) => {
      if (err) {
        throw err;
      }

      if (!row) {
        return res.json({ success: false, fallback: "/" });
      }

      QRCode.toDataURL(
        authenticator.keyuri(email, "2FA Server", row.secret),
        (err, url) => {
          if (err) {
            console.log("ERROR: ", err);
            return res.json({
              success: false,
              message: "Error while signing up",
            });
          }

          return res.json({ success: true, qrCode: url });
        }
      );
    });
  });
};

export default handler;
