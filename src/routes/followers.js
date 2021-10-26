const { Router } = require('express')
const router = Router()

const connection = require('../db')

router.get('/get-user-following-albums/:user_fk_id', (req, res) => {
    connection.query('SELECT * FROM followers WHERE user_fk_id = ?',[req.params.user_fk_id], (errors, results, fields) => {
        if (errors) return res.status(500).json({ errors }) 
        return res.status(200).json({ results })
    })
})

router.get('/get-album-followers/:album_fk_id', (req, res) => {
    connection.query('SELECT * FROM followers WHERE album_fk_id = ?',[req.params.album_fk_id], (errors, results, fields) => {
        if (errors) return res.status(500).json({ errors }) 
        return res.status(200).json({ results })
    })
})

router.post('/new-album-follow', (req, res) => {
    const body = req.body
    const values = [body.user_fk_id, body.album_fk_id]
    connection.query('INSERT INTO followers (user_fk_id, album_fk_id) VALUES (?, ?)', values, (errors, results, fields) => {
        if (errors) return res.status(500).json({errors})
        return res.status(200).json({ id: results.insertId })
    })
})

module.exports = router