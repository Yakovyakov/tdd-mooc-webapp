const { pool } = require('../../src/config/db');
const request = require('supertest');
const app = require('../../src/app');

describe('GET /api/health', () => {
  afterAll(async () => {
    await pool.end();
  });
  it('should return health status', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status', 'OK');
  });
});