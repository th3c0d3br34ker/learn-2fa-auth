import { MongoMemoryServer } from 'mongodb-memory-server';


let mongod = null;

const startMongoServer = async () => {
  mongod = new MongoMemoryServer();
  console.log('mongod', mongod.state);
  await mongod.start();
  console.log(`MongoDB server is running on ${mongod.getUri()}`);
};

const stopMongoServer = async () => {
  if (mongod.state === 'new' || mongod.state === 'running') {
    await mongod.stop();
  }
};

const getMongoUri = async () => {
  await startMongoServer();

  const uri = mongod.getUri();

  return uri;
};

export { startMongoServer, stopMongoServer, getMongoUri };
