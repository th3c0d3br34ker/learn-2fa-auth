import { getMongoUri } from '../scripts/local-mongo-server';

const MONGODB_URI =
  process.env.NODE_ENV === 'development'
    ? getMongoUri()
    : process.env.MONGODB_URI;

const NODE_ENV = process.env.NODE_ENV || 'development';

const API_URI = process.env.API_URI || 'http://localhost:3000';

console.log('MONGODB_URI', MONGODB_URI);
console.log('NODE_ENV', NODE_ENV);
console.log('API_URI', API_URI);

export { MONGODB_URI, NODE_ENV, API_URI };
