/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
import supertest from 'supertest';
import mongoose from 'mongoose';
import app from '../app';
import User from '../models/user';
import Db from './dbOperations';


const request = supertest(app);


beforeAll(async () => {
  mongoose.connect(process.env.TEST_DB,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
});

afterEach(async () => {
  Db.removeAllCollections();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('POST /api/auth/signup', () => {
  it('should register a new user', async (done) => {
    const newUser = {
      firstname: 'willy',
      lastname: 'test',
      email: 'testingemail@gmail.com',
      password: 'testPass123'
    };
    const res = await request.post('/api/auth/signup')
      .send(newUser).expect(201);
    const user = await User.findById(res.body.user._id);
    expect(user).not.toBeNull();
    expect(user.email).toBeTruthy();
    expect(user.password).not.toBe('testPass123');
    expect(res.body.token).toBeTruthy();
    done();
  });

  it('should not register a user with invalid data', async (done) => {
    const newUser = {
      firstname: 'willy',
      lastname: 'test',
      email: 'invalidemail',
      password: 'test'
    };
    const res = await request.post('/api/auth/signup')
      .send(newUser).expect(400);
    expect(res.body.error.message).toBeTruthy();
    done();
  });
});

describe('NON-EXISTING ENDPOINT', () => {
  it('should return 404 not found error', async (done) => {
    const res = await request.get('/notExist').expect(404);
    expect(res.body.error.message).toBe('Not Found');
    done();
  });
});
