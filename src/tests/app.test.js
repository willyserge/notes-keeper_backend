import supertest from 'supertest';
import app from '../app';

const request = supertest(app);

describe('test endpoint', () => {
  it('gets the test endpoint', async (done) => {
    const response = await request.get('/test');

    expect(response.status).toBe(200);

    done();
  });
});
