import { authenticator } from "otplib";

export const signup = async (db, { email }) => {
  const secret = authenticator.generateSecret();

  let insertStatus = {
    status: false,
    message: "Default Message",
  };

  await db.serialize(() => {
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
        }

        insertStatus = {
          status: true,
          secret,
          keyuri: authenticator.keyuri(email, secret),
        };
      }
    );
  });

  return insertStatus;
};
