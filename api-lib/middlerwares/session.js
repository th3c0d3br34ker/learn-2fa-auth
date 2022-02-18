import { NODE_ENV } from "lib/config";
import MongoStore from "connect-mongo";
import nextSession from "next-session";
import { promisifyStore } from "next-session/lib/compat";
import { getMongoClient } from "./database";

const mongoStore = MongoStore.create({
  client: getMongoClient(),
  stringify: false,
});

const getSession = nextSession({
  store: promisifyStore(mongoStore),
  cookie: {
    httpOnly: true,
    secure: NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60, // 1 week,
    path: "/",
    sameSite: "none",
  },
  touchAfter: 1 * 7 * 24 * 60 * 60, // 1 week
});

export default async function session(req, res, next) {
  await getSession(req, res);
  next();
}
