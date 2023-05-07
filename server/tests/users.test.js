const request = require('supertest');
const app = require('../app')

const baseUrl = '/api/users'

describe('GET / - Get user information', () =>
{
  let url = baseUrl;
  let sid_cookie = "";

  beforeAll(async () =>
  {
    await request(app)
      .post("/api/auth/login")
      .set('Content-Type', 'application/json')
      .send({
        "univID": "benpr438",
        "password": "totoFaitdukayak2!"
      })
      .expect(function (res)
      {
        sid_cookie = res.headers["set-cookie"]
      })
  });


  test('No Session', async () =>
  {
    await request(app)
      .get(url)
      .set('Accept', 'application/json')
      .expect(301)
      .expect('Location', /\/login/)
  });

  test('Not logged in - Wrong Session', async () =>
  {
    let other_user_session = "";

    await request(app)
      .post("/api/auth/login")
      .set('Content-Type', 'application/json')
      .send({
        "univID": "benpr439",
        "password": "totoFaitdukayak2!"
      })
      .expect(function (res)
      {
        other_user_session = res.headers["set-cookie"]
      });

    await request(app)
      .get(url)
      .set('Cookie', other_user_session)
      .set('Accept', 'application/json')
      .expect(301)
      .expect('Location', /\/login/)
  });

  test('Logged in', async () =>
  {
    await request(app)
      .get(url)
      .set('Cookie', sid_cookie)
      .set('Accept', 'application/json')
      .expect(200, {
        univID: "benpr438",
        email: "benpr438@student.liu.se",
        firstName: "toto",
        lastName: "titi",
        promo: 2024,
      })
  });
})

describe('PUT / - Update account', () =>
{
  let url = baseUrl;
  let sid_cookie = "";

  beforeAll(async () =>
  {
    await request(app)
      .post("/api/auth/login")
      .set('Content-Type', 'application/json')
      .send({
        "univID": "benpr438",
        "password": "totoFaitdukayak2!"
      })
      .expect(function (res)
      {
        sid_cookie = res.headers["set-cookie"]
      })
  });


  describe("Auth failure", () =>
  {
    let other_user_session = "";
    beforeAll(async () => {
      await request(app)
        .post("/api/auth/login")
        .set('Content-Type', 'application/json')
        .send({
          "univID": "benpr439",
          "password": "totoFaitdukayak2!"
        })
        .expect(function (res)
        {
          other_user_session = res.headers["set-cookie"]
        });
    })

    test('No session', async () =>
    {
      await request(app)
        .put(url)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send({
          "univID": "benpr438"
        })
        .expect(301)
        .expect('Location', /\/login/)
    })

    test('Wrong Session', async () =>
    {
      await request(app)
        .put(url)
        .set('Content-Type', 'application/json')
        .set('Cookie', other_user_session)
        .set('Accept', 'application/json')
        .send({
          "univID": "deofdddd"
        })
        .expect(301)
        .expect('Location', /\/login/)
    });

    test('Wrong Session but good ID', async () =>
    {
      await request(app)
        .put(url)
        .set('Content-Type', 'application/json')
        .set('Cookie', other_user_session)
        .set('Accept', 'application/json')
        .send({
          "univID": "benpr438"
        })
        .expect(301)
        .expect('Location', /\/login/)
    });
  });

  describe("ill formed", () => { });

  test('Logged in', async () =>
  {
    await request(app)
      .put(url)
      .set('Content-Type', 'application/json')
      .set('Cookie', sid_cookie)
      .set('Accept', 'application/json')
      .send({
        "univID": "benpr438"
      })
      .expect(200)
  });
})