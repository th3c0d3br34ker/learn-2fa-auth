import { authenticator } from "otplib";

export const sanitizeUser = (user) => {
  const newUser = { id: user._id, ...user };
  delete newUser.secret;
  delete newUser._id;
  return newUser;
};

export const verifyUser = (user, code) => {
  const isAuthenticated = authenticator.check(code, user.secret);

  return isAuthenticated;
};
