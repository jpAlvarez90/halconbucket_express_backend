const { Router } = require('express')
const router = Router()

const connection = require('../db')

router.get('/get-users', (req, res) => {
    connection.query('SELECT user_id, username, email, push_notification_data, role_fk_id FROM user', (errors, results, fields) => {
        if (errors) return res.status(500).json({ errors })
        return res.status(200).json({ results })
    })
})

router.get('/get-user/:user_id', (req, res) => {
    connection.query('SELECT user_id, username, email, push_notification_data, role_fk_id FROM user WHERE user_id = ?', [req.params.user_id], (errors, results, fields) => {
        if (errors) return res.status(500).json({ errors })
        return res.status(200).json({ result: results[0] })
    })
})

router.post('/insert-user', (req, res) => {
    const body = req.body
    const values = [body.username, body.email, body.password, body.role_fk_id] 
    connection.query('INSERT INTO user (username, email, password, role_fk_id) VALUES (?,?,?,?)', values, (errors, results, fields) => {
        if (errors) return res.status(500).json({ errors })
        return res.status(200).json({ id: results.insertId })
    })
})

router.put('/update-user', (req, res) => {
    const body = req.body
    const values = [body.username, body.email, body.role_fk_id, body.user_id]
    connection.query('UPDATE user SET username = ?, email = ?, role_fk_id = ? WHERE user_id = ?', values, (errors, results, fields) => {
        if (errors) return res.status(500).json({ errors })
        return res.status(200).json({ result: `Changed rows: ${results.changedRows}` })
    })
})

router.delete('/delete-user/:user_id', (req, res) => {
    connection.query('DELETE FROM user WHERE user_id = ?', [req.params.user_id], (errors, results, fields) => {
        if(errors) return res.status(500).json({ error: errors })
        return res.status(200).json({ result: results.affectedRows })
    })
})

module.exports = router