const expect = require('chai').expect;
const request = require('supertest');
const Pool = require('pg').Pool
const app = require('../../../app');

describe('GET /fixtures', () => {
    it('Should respond with json', (done) => {
        request(app)
            .get('/fixtures')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(done());
    })

})

describe('POST /fixtures', () => {
    it('Should respond with json', (done) => {
        request(app)
            .post('/fixtures')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(done());
    })

})

describe('PUT /fixtures', () => {
    it('Should respond with json', (done) => {
        request(app)
            .put('/fixtures')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(done());
    })

})

describe('DELETE /fixtures', () => {
    it('Should respond with json', (done) => {
        request(app)
            .delete('/fixtures')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(done());
    })

})