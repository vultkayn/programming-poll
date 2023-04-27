const request = require('supertest');
const app = require('../app');

describe('App', () => {
  test('has the default page', () => {
    request(app)
      .get('/')
      .expect(/Welcome to Express/);
  });
}); 
