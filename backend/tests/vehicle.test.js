const request = require('supertest');
const app = require('../server');
const User = require('../models/User');
const Vehicle = require('../models/Vehicle');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { connect, closeDatabase, clearDatabase } = require('./setup');

let userToken;
let adminToken;

const testUser = {
  name: 'Test User',
  email: 'user@test.com',
  password: 'password123',
  role: 'user'
};

const testAdmin = {
  name: 'Test Admin',
  email: 'admin@test.com',
  password: 'password123',
  role: 'admin'
};

const createToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role, name: user.name },
    process.env.JWT_SECRET || 'testsecret',
    { expiresIn: '7d' }
  );
};

beforeAll(async () => {
  await connect();
  process.env.JWT_SECRET = 'testsecret';
});

beforeEach(async () => {
  await clearDatabase();
  const hashedPassword = await bcrypt.hash('password123', 10);
  const user = await User.create({ ...testUser, password: hashedPassword });
  const admin = await User.create({ ...testAdmin, password: hashedPassword });
  userToken = createToken(user);
  adminToken = createToken(admin);
});

afterAll(async () => await closeDatabase());

describe('Vehicle', () => {
  test('5. Authenticated user can fetch vehicles', async () => {
    await Vehicle.create({
      make: 'Toyota',
      model: 'Camry',
      category: 'Sedan',
      price: 25000,
      quantity: 5
    });

    const response = await request(app)
      .get('/api/vehicles')
      .set('Authorization', `Bearer ${userToken}`);

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBe(1);
  });

  test('6. Admin can create vehicle', async () => {
    const response = await request(app)
      .post('/api/vehicles')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        make: 'Honda',
        model: 'Accord',
        category: 'Sedan',
        price: 27000,
        quantity: 10
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('make', 'Honda');
  });

  test('7. Purchase decreases quantity by one', async () => {
    const vehicle = await Vehicle.create({
      make: 'Ford',
      model: 'F-150',
      category: 'Truck',
      price: 35000,
      quantity: 3
    });

    const response = await request(app)
      .post(`/api/vehicles/${vehicle._id}/purchase`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(response.statusCode).toBe(200);
    const updatedVehicle = await Vehicle.findById(vehicle._id);
    expect(updatedVehicle.quantity).toBe(2);
  });

  test('8. Admin can restock inventory', async () => {
    const vehicle = await Vehicle.create({
      make: 'Chevrolet',
      model: 'Silverado',
      category: 'Truck',
      price: 38000,
      quantity: 2
    });

    const response = await request(app)
      .post(`/api/vehicles/${vehicle._id}/restock`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ quantity: 5 });

    expect(response.statusCode).toBe(200);
    const updatedVehicle = await Vehicle.findById(vehicle._id);
    expect(updatedVehicle.quantity).toBe(7);
  });

  test('9. Non-admin cannot delete vehicle', async () => {
    const vehicle = await Vehicle.create({
      make: 'Nissan',
      model: 'Altima',
      category: 'Sedan',
      price: 24000,
      quantity: 4
    });

    const response = await request(app)
      .delete(`/api/vehicles/${vehicle._id}`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(response.statusCode).toBe(403);
    const stillExists = await Vehicle.findById(vehicle._id);
    expect(stillExists).not.toBeNull();
  });

  test('10. Admin can delete vehicle', async () => {
    const vehicle = await Vehicle.create({
      make: 'Mazda',
      model: '6',
      category: 'Sedan',
      price: 26000,
      quantity: 3
    });

    const response = await request(app)
      .delete(`/api/vehicles/${vehicle._id}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(response.statusCode).toBe(200);
    const deletedVehicle = await Vehicle.findById(vehicle._id);
    expect(deletedVehicle).toBeNull();
  });
});
