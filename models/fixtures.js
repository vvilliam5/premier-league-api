const Pool = require('pg').Pool
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: true
})
//FIXTURES
//get all fixtures
const getFixtures = (request, response) => {
    pool.query('SELECT * FROM fixtures ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

//get fixture by id
const getFixturesById = (request, response) => {
    let id = parseInt(request.params.id)
    pool.query('SELECT * FROM fixtures WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}
//create new fixture
const createFixture = (request, response) => {
    let { id, home_name, home_score, away_name, away_score, status } = request.body;
    home_name = home_name.toLowerCase();
    away_name = away_name.toLowerCase();
    status = status.toLowerCase();
    pool.query('INSERT INTO fixtures (id, home_name, home_score, away_name, away_score, status) VALUES ($1, $2, $3, $4, $5, $6)', [id, home_name, home_score, away_name, away_score, status], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Fixture added with ID: ${results.insertId}`)
    })
}
//update a fixture
const updateFixture = (request, response) => {
    let id = parseInt(request.params.id)
    let { home_name, home_score, away_name, away_score, status } = request.body;
    home_name = home_name.toLowerCase();
    away_name = away_name.toLowerCase();
    status = status.toLowerCase();
    pool.query(
        'UPDATE fixtures SET home_name = $1, home_score = $2, away_name = $3, away_score = $4, status = $5 WHERE id = $6',
        [home_name, home_score, away_name, away_score, status, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Fixture modified with ID: ${id}`)
        }
    )
}
//delete a fixture
const deleteFixture = (request, response) => {
    let id = parseInt(request.params.id)
    pool.query('DELETE FROM fixtures WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Fixture deleted with ID: ${id}`)
    })
}


module.exports = {
    getFixtures,
    getFixturesById,
    createFixture,
    updateFixture,
    deleteFixture
}