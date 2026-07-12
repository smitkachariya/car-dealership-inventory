const request = require('supertest');
const app = require('../server');
const User = require('../models/User');
const { connect, closeDatabase, clearDatabase } = require('./setup');

beforeAll(async () => await connect());
beforeEach(async () => await clearDatabase());
afterAll(async () => await closeDatabase());

describe('Authentication', () => {
  describe('POST /api/auth/register', () => {
    test('1. Register user successfully', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123'
        });

      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('role', 'user');
    });

    test('2. Reject duplicate email registration', async () => {
      await User.create({
        name: 'Existing User',
        email: 'duplicate@example.com',
        password: 'hashedpassword'
      });

      const response = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Another User',
          email: 'duplicate@example.com',
          password: 'password123'
        });

      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty('message', 'User already exists');
    });
  });

  describe('POST /api/auth/login', () => {
    beforeEach(async () => {
      await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Login User',
          email: 'login@example.com',
          password: 'password123'
        });
    });

    test('3. Login successfully', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'login@example.com',
          password: 'password123'
        });

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('token');
    });

    test('4. Reject invalid credentials', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'login@example.com',
          password: 'wrongpassword'
        });

      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty('message', 'Invalid credentials');
    });
  });
});
