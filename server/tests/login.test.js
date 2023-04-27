const request = require('supertest');

const app = require('../app')

const baseUrl = '/api/account'

describe('POST /login - Log in account', () => {
    let url = baseUrl + '/login'

    test('Wrong password', async () => {
        await request(app)
            .post(url)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send({"password": "tooFaitdukayak2!", "univID": "benpr438"})
            .expect('Content-Type', /json/)
            .expect(401, {message: "Wrong password"})
    })

    test('User not found', async () => {
        await request(app)
            .post(url)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send({"password": "nomatter", "univID": "benpr43899"})
            .expect('Content-Type', /json/)
            .expect(401, {message: "User not found"})
    })

    test('Succesful login - univID', async () => {
        await request(app)
            .post(url)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send({"password": "totoFaitdukayak2!", "univID": "benpr438"})
            .expect('Content-Type', /json/)
            .expect(200, {univID: "benpr438"})
    })

    test('Succesful login - email', async () => {
        await request(app)
            .post(url)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send({"password": "totoFaitdukayak2!", "email": "benpr438@student.liu.se"})
            .expect('Content-Type', /json/)
            .expect(200, {univID: "benpr438"})
    })

    describe('Sanitization', () => {
        test('Missing ID', async () => {
            await request(app)
                .post(url)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .send({"password": "totoFaitdukayak2!"})
        })

        test('Missing password & valid user', async () => {
            await request(app)
                .post(url)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .send({ "univID": "benpr438"})
        })

        test('Missing password & invalid user', async () => {
            await request(app)
                .post(url)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .send({ "univID": "benpr438"})
        })

        test('Impossible ID', async () => {
            await request(app)
                .post(url)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .send({"password": "totoFaitdukayak2!", "univID": "benpr438"})
        })
    })
});


describe('POST / - Create account', () => {
    let url = baseUrl

    let payload = {
        "univID": "benpr438",
        "password": "totoFaitdukayak2!",
        "firstName": "toto",
        "lastName": "titi",
        "promo": 2024,
        "email": "benpr438@student.liu.se"
        }

    test('User already exists - univID', async () => {
        await request(app)
            .post(url)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send({...payload, email: "doesnt@gmail.com"})
            .expect('Content-Type', /json/)
            .expect(400, {message: "User already exists"})
    })

    test('User already exists - email', async () => {
        await request(app)
            .post(url)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send({
                ...payload,
                univID: "doesnt"
            })
            .expect('Content-Type', /json/)
            .expect(400, {message: "User already exists"})
    })

    describe('Sanitization', () => {
        test('Missing ID', async () => {
            await request(app)
                .post(url)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .send({"password": "totoFaitdukayak2!"})
        })

        test('Invalid password', async () => {
            await request(app)
                .post(url)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .send({
                    ...payload,
                    "password": "nouppercase"
                })
                .expect('Content-Type', /json/)
                .expect(400, (res) => {
                    expect(res.body).toHaveProperty('password.msg', "Invalid value")
                })
        })

        test('Missing password & invalid user', async () => {
            await request(app)
                .post(url)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .send({ "univID": "benpr438"})
        })

        test('Impossible ID', async () => {
            await request(app)
                .post(url)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .send({"password": "totoFaitdukayak2!", "univID": "benpr438"})
        })
    })
});


describe('PUT / - Update account', () => {
    let url = baseUrl;

    test('Not logged in - Valid User', async () => {
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

        test('Not logged in - Invalid User', async () => {
        await request(app)
            .put(url)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send({
                "univID": "deofoe789"   
            })
            .expect(301)
            .expect('Location', /\/login/)
    });
})