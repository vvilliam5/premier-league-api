const expect = require('chai').expect;
const request = require('supertest');
const Pool = require('pg').Pool
const app = require('../../../app');

describe('GET /fixtures', () => {
    it('Should respond with json', (done) => {
        request(app)
            .get('/fixtures')
            .then((res) => {
                console.log(res.status);
                done();
            })
    })

})