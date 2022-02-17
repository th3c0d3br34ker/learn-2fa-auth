export const verifyLogin = (db, { email, code }, { req, res }) => {
  db.serialize(() => {
    db.get("SELECT secret FROM users WHERE email = ?", [email], (err, row) => {
      if (err) {
        throw err;
      }

      if (!row) {
        return res.redirect("/auth/login");
      }

      if (!authenticator.check(code, row.secret)) {
        //redirect back
        return res.redirect("/auth/login");
      }

      console.log("Login Successful");

      return res.redirect("/?email=" + email);
    });
  });
};
