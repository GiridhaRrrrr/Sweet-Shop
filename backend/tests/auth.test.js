import request from 'supertest';
import app from '../src/index.js';
import mongoose from 'mongoose';
import User from '../src/models/User.js';
import dotenv from 'dotenv';

dotenv.config();

// Connect to a test database before all tests
beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

// Clear the users collection before each test
beforeEach(async () => {
  await User.deleteMany({});
});

// Disconnect from the database after all tests
afterAll(async () => {
  await mongoose.connection.close();
});


describe('Auth Endpoints', () => { //This groups all our authentication-related tests together.

 //This is our specific test case, described in plain English
  // it('should register a new user successfully', async () => {
  //   const newUser = {
  //     username: 'testuser',
  //     password: 'password123'
  //   };

  //   //This is Supertest in action. It's making a virtual POST request to the /api/auth/register endpoint of our app.
  //   const response = await request(app)
  //     .post('/api/auth/register')
  //     .send(newUser);//This puts the newUser object into the request's body.

  //   // Assertions
  //   //This is Jest. We are making "assertions," checking if the response from our API is what we expect (e.g., status code is 201, the body has an id and username, etc.).
  //   // expect(response.statusCode).toBe(201);
  //   // expect(response.body).toHaveProperty('id');
  //   // expect(response.body).toHaveProperty('username', newUser.username);
  //   // // Ensure the password is not returned
  //   // expect(response.body).not.toHaveProperty('password');

  //   expect(response.statusCode).toBe(201);
  //   expect(response.body).toHaveProperty('_id'); // MongoDB uses _id
  //   expect(response.body).toHaveProperty('username', newUser.username);

  //   // ---Check the Database ---
  //   const userInDb = await User.findOne({ username: 'testuser' });
  //   expect(userInDb).not.toBeNull(); // Assert the user was actually created
  //   expect(userInDb.username).toBe(newUser.username);
  //   expect(userInDb.password).not.toBe(newUser.password);
  // });

  it('should register a new user successfully', async () => {
  const newUser = { username: 'testuser', password: 'password123' };
  
  const response = await request(app)
    .post('/api/auth/register')
    .send(newUser);
    
  expect(response.statusCode).toBe(201);
  expect(response.body).toHaveProperty('_id');
  expect(response.body).toHaveProperty('username', newUser.username);
  expect(response.body).toHaveProperty('token');
});  

  it('should return a 400 error if username or password is not provided', async () => {
    const badUser = {
      username: 'testuser'
    };

    const response = await request(app)
      .post('/api/auth/register')
      .send(badUser);

    expect(response.statusCode).toBe(400);
  });

  it('should log in a registered user and return a JWT', async () => {
    const userData = { username: 'loginuser', password: 'password123' };
    
    await User.create(userData);

    const response = await request(app)
      .post('/api/auth/login')
      .send({ username: userData.username, password: userData.password });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
});

it('should return a 401 error for invalid credentials', async () => {
    const userData = { username: 'loginuser2', password: 'password123' };
    
    await User.create(userData);

    const response = await request(app)
      .post('/api/auth/login')
      .send({ username: userData.username, password: 'wrongpassword' });

    expect(response.statusCode).toBe(401);
});

});