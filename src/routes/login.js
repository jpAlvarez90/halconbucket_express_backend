const { Router } = require('express')
const router = Router()

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const { SECRET } = require('../utils/utils')
const connection = require('../db')

router.post('/login', async (req, res) => {
    const { username, password } = req.body
    connection.query('SELECT * FROM user WHERE username = ? OR email = ?', [username, username], async (errors, results, fields) => {
        if (errors) {
            console.log(errors)
            return res.status(500).json({ 'Error': 'Error getting the user in the database' })
        }

        const match = await bcrypt.compare(password, results[0].password)
        if (!match) return res.status(500).json({ 'Error': 'The password does not match' })

        const token = getToken(results[0].user_id, results[0].username, results[0].email, results[0].role_fk_id)

        return res.status(200).json({ token })
    })
})

router.post('/register', async (req, res) => {
    let { username, password, email, role_fk_id } = req.body
    connection.query('SELECT username, email FROM user WHERE username = ? AND email = ?', [username, email], async (errors, results, fields) => {
        if (errors) return res.status(500).json({ errors })
        if (!results[0] === {}) return res.status(500).json({ "Error": "User already exists" })

        password = await bcrypt.hash(password, 10)
        connection.query('INSERT INTO user (username, email, password, role_fk_id) VALUES (?,?,?,?)', [username, email, password, role_fk_id], (errors, results, fields) => {
            if (errors) {
                console.log(errors)
                return res.status(500).json({ 'Error': 'User not inserted' })
            }
            const token = getToken(results.insertId, username, email, role_fk_id)
            return res.status(200).json({ token })
        })
    })
})

const getToken = ({ id, username, email, user_role }) => 
    jwt.sign({ id, username, email, user_role }, SECRET, { expiresIn: '1d' })

module.exports = router