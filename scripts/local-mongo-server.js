import { MongoMemoryServer } from 'mongodb-memory-server';

const mongod = await MongoMemoryServer.create();

const startMongoServer = async () => {
  if (!mongod.isRunning) {
    await mongod.start();
    console.log(`MongoDB server is running on ${mongod.getUri()}`);
  }
};

const stopMongoServer = async () => {
  if (mongod.isRunning) {
    await mongod.stop();
  }
};

const getMongoUri = async () => {
  await startMongoServer();

  const uri = mongod.getUri();

  return uri;
};

export { startMongoServer, stopMongoServer, getMongoUri };
