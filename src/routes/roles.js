const { Router } = require('express')
const router = Router()

const connection = require('../db')

router.get('/get-roles', (req, res) => {
    connection.query('SELECT * FROM role', (errors, results, fields) => {
        if(errors) return res.status(500).json({ error: errors })
        return res.status(200).json({ results })
    })
})

router.get('/get-role/:role_id', (req, res) => {
    connection.query('SELECT * FROM role WHERE role_id = ?', [req.params.role_id], (errors, results, fields) => {
        if(errors) return res.status(500).json({ error: errors })
        return res.status(200).json({ result: results[0] })
    })
})

router.post('/insert-role', (req, res) => {
    const { role_name } = req.body
    connection.query('INSERT INTO role (role_name) VALUES (?)', [role_name], (errors, results, fields) => {
        if (errors) return res.status(500).json({ errors })
        return res.status(200).json({ id: results.insertId })
    })
})

router.put('/update-role', (req, res) => {
    const body = req.body
    connection.query('UPDATE role SET role_name = ? WHERE role_id = ?', [body.role_name, body.role_id], (errors, results, fields) => {
        if (errors) return res.status(500).json({ errors })
        return res.status(200).json({ result: `Changed rows: ${results.changedRows}` })
    })
})

router.delete('/delete-role/:role_id', (req, res) => {
    connection.query('DELETE FROM role WHERE role_id = ?', [req.params.role_id], (errors, results, fields) => {
        if(errors) return res.status(500).json({ error: errors })
        return res.status(200).json({ result: results.affectedRows })
    })
})

module.exports = router