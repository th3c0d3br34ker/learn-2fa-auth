import nextSession from "next-session";

export const getSession = nextSession({
  secret: "2fa-secret",
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    httpOnly: false,
    secure: process.env.NODE_ENV === "production", // cookie only works in https
  },
});
