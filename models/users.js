const Pool = require('pg').Pool
// const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'pl_api',
    password: '123',
    port: 5432,
})
//USERS
//create a user
const createUser = (request, response) => {
    const { email, password, type } = request.body;
    //bcrypt sucks
    // bcrypt.hash(email, 10, (err, hash) => {
    //     if (err) {
    //         return response.status(500).json({ error: err });
    //     } else {
    //         pool.query('INSERT INTO users (email, password, type) VALUES ($1, $2, $3)', [email, hash, type], (error, results) => {
    //             if (error) {
    //                 return response.status(400).json({ "message": "Error! This email already exists" })
    //             }
    //             response.status(201).send(`User added with ID: ${results.insertId}`)
    //         })
    //     }
    // })
    pool.query('INSERT INTO users (email, password, type) VALUES ($1, $2, $3)', [email, password, type], (error, results) => {
        if (error) {
            return response.status(400).json({ "message": "Error! This email already exists" })
        }
        response.status(201).send(`User added with ID: ${results.insertId}`)
    })
}
//delete a user
const deleteUser = (request, response) => {
    const id = parseInt(request.params.id);
    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            return response.status(400).json({ "message": "There was an error deleting the user, please try again" })
        }
        response.status(200).send(`User deleted with ID: ${id}`)
    })
}
//get all users
const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (error) {
            return response.status(500).json({ "message": "There was n error retrieving the list of users" });
        }
        response.status(200).json(results.rows)
    })
}
//login
const userLogin = (request, response) => {
    const { email, password } = request.body;
    // const id = parseInt(request.params.id)
    pool.query('SELECT * FROM users WHERE email = $1', [email], (error, results) => {
        if (error) {
            return response.status(401).json({ "message": "Couldnt fetch record" })
        }
        // bcrypt.compare(password, results.rows[0].password, (err, correct) => {
        //     if (err) {
        //         return response.status(401).json({ "message": "Password doesnt match" })
        //     }
        //     if (correct) {
        //         return response.status(200).json({ "message": "Login Successful" })
        //     }
        //     return response.status(401).json({ "message": "Something went wrong" })
        // })
        if (password === results.rows[0].password) {
            const token = jwt.sign({
                id: results.rows[0].id,
                email: results.rows[0].email
            }, "secret_admin", {
                expiresIn: "1h"
            })
            return response.status(200).json({ message: "Login Successful", token: token })
        }
        else {
            return response.status(401).json({ "message": "Password doesnt match" })
        }
    })
}
// //update a fixture
// const updateFixture = (request, response) => {
//     const id = parseInt(request.params.id)
//     const { home_name, home_score, away_name, away_score, status } = request.body

//     pool.query(
//         'UPDATE fixtures SET home_name = $1, home_score = $2, away_name = $3, away_score = $4, status = $5 WHERE id = $6',
//         [home_name, home_score, away_name, away_score, status, id],
//         (error, results) => {
//             if (error) {
//                 throw error
//             }
//             response.status(200).send(`Fixture modified with ID: ${id}`)
//         }
//     )
// }



module.exports = {
    createUser,
    deleteUser,
    getUsers,
    userLogin
}