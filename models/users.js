const Pool = require('pg').Pool
// const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: true
})

//USERS
//create a user
const createUser = (request, response) => {
    let { email, password, type } = request.body;
    email = email.toLowerCase();
    pool.query("INSERT INTO users VALUES ($1, $2, $3)", [email, password, type], (error, results) => {
        if (error) {
            return response.status(401).json({ "error": error.message })
        }
        response.status(201).send(`User added with ID: ${results.insertId}`)
    })
}
//delete a user
// const deleteUser = (request, response) => {
//     const email = parseInt(request.params.email);
//     pool.query('DELETE FROM users WHERE email = $1', [email], (error, results) => {
//         if (error) {
//             return response.status(400).json({ "message": "There was an error deleting the user, please try again" })
//         }
//         response.status(200).send(`User deleted with email: ${email}`)
//     })
// }
//get all users
const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY email ASC', (error, results) => {
        if (error) {
            return response.status(500).json({ "message": "There was n error retrieving the list of users" });
        }
        response.status(200).json(results.rows)
    })
}
//login
const userLogin = (request, response) => {
    let { email, password } = request.body;
    email = email.toLowerCase();
    pool.query('SELECT * FROM users WHERE email = $1', [email], (error, results) => {
        if (error) {
            return response.status(401).json({ "message": "Couldnt fetch record" })
        }
        if (password === results.rows[0].password) {
            if (results.rows[0].type == "admin") {
                const token = jwt.sign({
                    email: results.rows[0].email
                }, "secret_admin", {
                    expiresIn: "1h"
                })
                return response.status(200).json({ message: "Login Successful", token: token })
            }
            else if (results.rows[0].type == 'user') {
                const token = jwt.sign({
                    email: results.rows[0].email
                }, "secret_user", {
                    expiresIn: "1h"
                })
                return response.status(200).json({ message: "Login Successful", token: token })
            }
        }
        else {
            return response.status(401).json({ "message": "Password doesnt match" })
        }
    })
}

module.exports = {
    createUser,
    getUsers,
    userLogin
}