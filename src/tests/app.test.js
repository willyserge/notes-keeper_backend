/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
import supertest from 'supertest';
import mongoose from 'mongoose';
import app from '../app';
import User from '../models/user';
import Note from '../models/note';
import { user, setupDatabase, noteId } from './dbOperations';

const request = supertest(app);

beforeAll(async () => {
  mongoose.connect(process.env.TEST_DB,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
});

beforeEach(setupDatabase);

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
    const testUser = await User.findById(res.body.user._id);
    expect(testUser).not.toBeNull();
    expect(testUser.email).toBeTruthy();
    expect(testUser.password).not.toBe('testPass123');
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

describe('POST /api/auth/signin', () => {
  it('should login existing user', async (done) => {
    const res = await request.post('/api/auth/signin').send({
      email: user.email,
      password: user.password
    }).expect(200);
    expect(res.body.token).toBeTruthy();
    done();
  });

  it('should not signin a user with invalid data', async (done) => {
    const testUser = {
      email: 'invalidemail',
      password: 'test'
    };
    const res = await request.post('/api/auth/signin')
      .send(testUser).expect(400);
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


describe('POST /api/note', () => {
  it('should create a new note', async (done) => {
    const newNote = {
      title: 'test title',
      category: 'general',
      description: 'test description'
    };

    const res = await request.post('/api/note')
      .send(newNote).set('Authorization', `Bearer ${process.env.TEST_TOKEN}`)
      .expect(201);
    const singleNote = await Note.findById(res.body.note._id);
    expect(singleNote).not.toBeNull();
    done();
  });

  it('should not create a note with invalid data', async (done) => {
    const newNote = {
      title: '',
      category: '',
      description: ''
    };
    const res = await request.post('/api/note')
      .send(newNote).set('Authorization', `Bearer ${process.env.TEST_TOKEN}`)
      .expect(400);
    expect(res.body.error.message).toBeTruthy();
    done();
  });

  it('should not create a note if not authenticated', async (done) => {
    const newNote = {
      title: 'test title',
      category: 'professional',
      description: 'test description'
    };
    await request.post('/api/note')
      .send(newNote)
      .expect(403);
    done();
  });
});

describe('GET /api/note', () => {
  it('get all notes', async (done) => {
    const res = await request.get('/api/note')
      .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`)
      .send()
      .expect(200);
    expect(res.body.notes).toBeTruthy();
    done();
  });

  it('should not get notes if not authenticated', async (done) => {
    await request.get('/api/note')
      .send()
      .expect(403);
    done();
  });
});

describe('GET /api/note/:noteId', () => {
  it('should get a single note', async (done) => {
    const res = await request.get(`/api/note/${noteId}`)
      .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`)
      .send()
      .expect(200);
    expect(res.body.note).toBeTruthy();
    done();
  });

  it('should not find note', async (done) => {
    await request.get('/api/note/123testId')
      .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`)
      .send()
      .expect(400);
    done();
  });

  it('should not a single note if not authenticated', async (done) => {
    await request.get(`/api/note/${noteId}`)
      .send()
      .expect(403);
    done();
  });
});

describe('PUT /api/note', () => {
  it('should update an existing note', async (done) => {
    const updatedNote = {
      title: 'updated  title'
    };

    await request.put(`/api/note/${noteId}`)
      .send(updatedNote).set('Authorization', `Bearer ${process.env.TEST_TOKEN}`)
      .expect(200);
    done();
  });


  it('should not update a note if not authenticated', async (done) => {
    const updatedNote = {
      category: 'professional'
    };
    await request.put(`/api/note/${noteId}`)
      .send(updatedNote)
      .expect(403);
    done();
  });
});

describe('DELETE /api/note', () => {
  it('should delete an existing note', async (done) => {
    const res = await request.delete(`/api/note/${noteId}`)
      .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`)
      .send()
      .expect(200);
    expect(res.body.message).toBe('note deleted successfully');
    done();
  });
});

describe('GET / ', () => {
  it('should welcome a user to the api', async (done) => {
    const res = await request.get('/').expect(200);
    expect(res.body.message).toBe('welcome to notes-keeper API');
    done();
  });
});
