import { NODE_ENV } from "./config";

// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
export const sessionOptions = {
  password: "aa8ecfc897c1ba2182d2fc39c9748995a836a32a8b5bd26ada3c6487b277059b",
  cookieName: "2fa-auth-session",
  cookieOptions: {
    secure: NODE_ENV === "production",
  },
};
