import jwt from 'jsonwebtoken';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

let mongo: MongoMemoryServer;

jest.mock('../nats-wrapper');

declare global {
  var signin: () => string;
}

beforeAll(async () => {
  process.env.JWT_KEY = '123123';
  mongo = await MongoMemoryServer.create();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signin = () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  const email = 'test@test.com';
  const payload = {
    id,
    email,
  };

  const token = jwt.sign(payload, process.env.JWT_KEY!);
  const session = { jwt: token };
  const sessionJSON = JSON.stringify(session);
  const base64 = Buffer.from(sessionJSON).toString('base64');

  return `session=${base64}`;

  // const response = await request(app)
  //   .post('/api/users/signup')
  //   .send({
  //     email,
  //     password,
  //   })
  //   .expect(201);
  // const cookie = response.get('Set-Cookie');

  // return cookie;
};
