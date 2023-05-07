const request = require('supertest');

const app = require('../app')

const baseUrl = '/api/auth'

describe('POST /login - Log in account', () => {
    let url = baseUrl + '/login'

    test('wrong password', async () => {
        await request(app)
            .post(url)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send({"password": "tooFaitdukayak2!", "univID": "benpr438"})
            .expect('Content-Type', /json/)
            .expect(401, {errors:{message: "wrong password"}})
    })

    test('user not found', async () => {
        await request(app)
            .post(url)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send({"password": "nomatter", "univID": "notexisting"})
            .expect('Content-Type', /json/)
            .expect(401, {errors:{message: "user not found"}})
    })

    test('Successful login - univID', async () => {
        await request(app)
            .post(url)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send({"password": "totoFaitdukayak2!", "univID": "benpr438"})
            .expect('Content-Type', /json/)
            .expect(200, {univID: "benpr438"})
            .expect((res) => {if (! ('set-cookie' in res.headers)) throw new Error('Missing set-cookie')})
          })
          
          test('Successful login - email', async () => {
            await request(app)
            .post(url)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send({"password": "totoFaitdukayak2!", "email": "benpr438@student.liu.se"})
            .expect('Content-Type', /json/)
            .expect(200, {univID: "benpr438"})
            .expect((res) => {if (! ('set-cookie' in res.headers)) throw new Error('Missing set-cookie')})
          })

    test('Email priority over univID', async () => {
        await request(app)
            .post(url)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send({"password": "totoFaitdukayak2!", "email": "benpr438@student.liu.se", "univID": "benpr440"})
            .expect('Content-Type', /json/)
            .expect(200, {univID: "benpr438"})
            .expect((res) => {if (! ('set-cookie' in res.headers)) throw new Error('Missing set-cookie')})
    })

    describe('Sanitization', () => {
        test('Missing ID and email', async () => {
            await request(app)
                .post(url)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .send({"password": "totoFaitdukayak2!"})
                .expect(400, {
                    errors: {
                      univID: {location: "body", msg: "invalid value"},
                      email: {location: "body", msg: "invalid value"}
                }});
        })

        test('Missing password but valid user', async () => {
            await request(app)
                .post(url)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .send({ "univID": "benpr438"})
                .expect(400, {
                    errors: {
                        password: {msg: "invalid value", location: "body"}
                    }
                });
            })
            
        test('Missing password but invalid user', async () => {
            await request(app)
            .post(url)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send({ "univID": "notexistent"})
            .expect(400, {
                errors: {
                    password: {msg: "invalid value", location: "body"}
                }
            });
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

    test('user already exists - univID', async () => {
        await request(app)
            .post(url)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send({...payload, email: "doesnt@gmail.com"})
            .expect('Content-Type', /json/)
            .expect(400, {errors:{message: "user already exists"}})
    })

    test('user already exists - email', async () => {
        await request(app)
            .post(url)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send({
                ...payload,
                univID: "doesnt"
            })
            .expect('Content-Type', /json/)
            .expect(400, {errors:{message: "user already exists"}})
    })

    describe('Sanitization', () => {
        test('Missing ID', async () => {
            await request(app)
                .post(url)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .send({...payload, univID:""})
                .expect(400, {
                    errors: {
                        univID: {msg: "invalid value", location: "body"}
                    }
                })
        })

        test('invalid password', async () => {
            await request(app)
                .post(url)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .send({
                    ...payload,
                    "password": "nouppercase"
                })
                .expect('Content-Type', /json/)
                .expect(400, {
                    errors: {
                        password: {msg: "invalid value", location: "body"}
                    }
                })
        })
    })
});
