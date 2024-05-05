export async function getUserWithEmail(db, { email }) {
  const user = await db.collection("users").findOne({ email });
  return user;
}

export async function insertUser(db, { email, secret }) {
  const result = await db.collection("users").insertOne({
    email,
    secret,
    createdAt: new Date(),
  });

  if (result.insertedId) {
    return db.collection("users").findOne(result.insertedId);
  }

  return null;
}

export async function deleteUser(db, { email }) {
  const user = await db.collection("users").deleteOne({ email });
  return user;
}
