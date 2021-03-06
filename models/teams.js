const Pool = require('pg').Pool
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: true
})
//TEAMS
//get all teams
const getTeams = (request, response) => {
    pool.query('SELECT * FROM teams ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

//get team by id
const getTeamsById = (request, response) => {
    let id = parseInt(request.params.id)
    pool.query('SELECT * FROM teams WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}
//create new team
const createTeam = (request, response) => {
    let { id, team_name } = request.body;
    team_name = team_name.toLowerCase();
    pool.query('INSERT INTO teams (id, team_name) VALUES ($1, $2)', [id, team_name], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Team added with ID: ${results.insertId}`)
    })
}
//update a team
const updateTeam = (request, response) => {
    let id = parseInt(request.params.id)
    let { team_name } = request.body;
    team_name = team_name.toLowerCase();
    pool.query(
        'UPDATE teams SET team_name = $1  WHERE id = $2',
        [team_name, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Team modified with ID: ${id}`)
        }
    )
}
//delete a team
const deleteTeam = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('DELETE FROM teams WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Team deleted with ID: ${id}`)
    })
}

module.exports = {
    getTeams,
    getTeamsById,
    createTeam,
    updateTeam,
    deleteTeam
}