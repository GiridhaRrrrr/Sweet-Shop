import request from 'supertest';
import mongoose from 'mongoose';
import app from '../src/index.js';
import User from '../src/models/User.js';
import Sweet from '../src/models/Sweet.js';
import dotenv from 'dotenv';
dotenv.config();

let userToken;
let adminToken;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await User.deleteMany({});
  
  await request(app).post('/api/auth/register').send({ username: 'user', password: 'password' });
  let res = await request(app).post('/api/auth/login').send({ username: 'user', password: 'password' });
  userToken = res.body.token;
  
  await User.create({ username: 'admin', password: 'password', role: 'admin' });
  res = await request(app).post('/api/auth/login').send({ username: 'admin', password: 'password' });
  adminToken = res.body.token;
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Inventory Endpoints', () => {
  let sweet;
  beforeEach(async () => {
    await Sweet.deleteMany({});
    sweet = await Sweet.create({ name: 'Test Sweet', category: 'Test', price: 1.00, quantity: 10 });
  });

  it('should allow a user to purchase a sweet, decreasing quantity by 1', async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweet._id}/purchase`)
      .set('Authorization', `Bearer ${userToken}`);
      
    expect(res.statusCode).toBe(200);
    expect(res.body.quantity).toBe(9);
  });
  
  it('should return a 400 error when purchasing an out-of-stock sweet', async () => {
    sweet.quantity = 0;
    await sweet.save();
    
    const res = await request(app)
      .post(`/api/sweets/${sweet._id}/purchase`)
      .set('Authorization', `Bearer ${userToken}`);
      
    expect(res.statusCode).toBe(400);
  });

  it('should allow an admin to restock a sweet', async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweet._id}/restock`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ amount: 50 });
      
    expect(res.statusCode).toBe(200);
    expect(res.body.quantity).toBe(60);
  });

  it('should NOT allow a regular user to restock a sweet', async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweet._id}/restock`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({ amount: 50 });
      
    expect(res.statusCode).toBe(403);
  });
});