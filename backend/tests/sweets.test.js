import request from 'supertest';
import mongoose from 'mongoose';
import app from '../src/index.js';
import User from '../src/models/User.js';
import Sweet from '../src/models/Sweet.js';
import dotenv from 'dotenv';
dotenv.config();

let userToken;
let adminToken;
let sweetToUpdate;

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

beforeEach(async () => {
  await Sweet.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('/api/sweets', () => {
  it('should create a new sweet for an authenticated user', async () => {
    const newSweet = { name: 'Chocolate Bar', category: 'Candy', price: 1.50, quantity: 100 };
    
    const res = await request(app)
      .post('/api/sweets')
      .set('Authorization', `Bearer ${userToken }`)
      .send(newSweet);
      
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe(newSweet.name);
  });

  it('should return 401 if no token is provided', async () => {
    const newSweet = { name: 'Gummy Bears', category: 'Candy', price: 2.00, quantity: 50 };
    
    const res = await request(app)
      .post('/api/sweets')
      .send(newSweet);
      
    expect(res.statusCode).toBe(401);
  });

  it('should get all sweets for an authenticated user', async () => {
  // Add some sweets to the database first
  await Sweet.create([
    { name: 'Lollipop', category: 'Candy', price: 0.50, quantity: 200 },
    { name: 'Caramel', category: 'Toffee', price: 1.20, quantity: 150 }
  ]);
  
  const res = await request(app)
    .get('/api/sweets')
    .set('Authorization', `Bearer ${userToken }`);
    
  expect(res.statusCode).toBe(200);
  expect(res.body.length).toBe(2);
});
});

describe('/api/sweets/search', () => {
  beforeEach(async () => {

    await Sweet.create([
      { name: 'Chocolate Cake', category: 'Cake', price: 2.50, quantity: 10 },
      { name: 'Gummy Bears', category: 'Candy', price: 1.00, quantity: 50 },
      { name: 'Caramel Toffee', category: 'Toffee', price: 1.20, quantity: 40 },
      { name: 'Chocolate Bar', category: 'Candy', price: 1.50, quantity: 100 },
    ]);
  });

  it('should find sweets by name (case-insensitive)', async () => {
    const res = await request(app)
      .get('/api/sweets/search?name=chocolate')
      .set('Authorization', `Bearer ${userToken }`);
      
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(2);
  });

  it('should find sweets by category', async () => {
    const res = await request(app)
      .get('/api/sweets/search?category=Cake')
      .set('Authorization', `Bearer ${userToken }`);
      
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toBe('Chocolate Cake');
  });

  it('should find sweets by price range', async () => {
    const res = await request(app)
      .get('/api/sweets/search?minPrice=1&maxPrice=1.5')
      .set('Authorization', `Bearer ${userToken }`);
      
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(3);
  });
});

describe('/api/sweets/:id', () => {
  let sweet;
  beforeEach(async () => {
    sweet = await Sweet.create({ name: 'Test Sweet', category: 'Test', price: 1.00, quantity: 10 });
  });

  it('should update a sweet', async () => {
    const res = await request(app)
      .put(`/api/sweets/${sweet._id}`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({ price: 2.50 });
      
    expect(res.statusCode).toBe(200);
    expect(res.body.price).toBe(2.50);
  });
  
  it('should be deleted by an admin', async () => {
    const res = await request(app)
      .delete(`/api/sweets/${sweet._id}`)
      .set('Authorization', `Bearer ${adminToken}`);
      
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Sweet removed');
  });
  
  it('should NOT be deleted by a regular user', async () => {
    const res = await request(app)
      .delete(`/api/sweets/${sweet._id}`)
      .set('Authorization', `Bearer ${userToken}`);
      
    expect(res.statusCode).toBe(403);
  });
});