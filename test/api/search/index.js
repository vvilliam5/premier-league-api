const expect = require('chai').expect;
const request = require('supertest');
const Pool = require('pg').Pool
const app = require('../../../app');

describe('Search by Teams', () => {
    it('Should respond with json', (done) => {
        request(app)
            .get('/fixtures')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(done());
    })

})

describe('Search by Fixtures', () => {
    it('Should respond with json', (done) => {
        request(app)
            .post('/fixtures')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(done());
    })

})
