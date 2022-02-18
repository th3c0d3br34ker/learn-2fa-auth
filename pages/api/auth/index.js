import nextConnect from "next-connect";
import { database, session } from "api-lib/middlerwares";

const handler = nextConnect();

handler.use(database);
handler.use(session);

handler.delete(async (req, res) => {
  await req.session.destroy();
  res.statusCode = 200;
  res.end();
});
