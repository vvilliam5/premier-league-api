const Pool = require('pg').Pool
const jwt = require('jsonwebtoken');

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

//search by fixtures
const searchFixtures = (request, response) => {
    let { search } = request.body;
    search = search.toLowerCase();
    pool.query('SELECT * FROM fixtures WHERE home_name like $1 or away_name like $1 or status like $1', [search], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}
//search by team
const searchTeams = (request, response) => {
    const { search } = request.body;
    search = search.toLowerCase();
    pool.query('SELECT * FROM fixtures WHERE team_name like $i', [search], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}
module.exports = {
    searchFixtures,
    searchTeams
}