export async function getUserWithEmail(db, { email }) {
  const user = await db.collection("users").findOne({ email });
  return user;
}

export async function insertUser(db, { email, secret }) {
  const user = await db.collection("users").insertOne({
    email,
    secret,
    createdAt: new Date(),
  });
  return user;
}
