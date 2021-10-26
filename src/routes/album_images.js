const { Router } = require('express')
const router = Router()

const connection = require('../db')

router.get('/get-album-images', (req, res) => {
    connection.query('SELECT * FROM album_images', (errors, results, fields) => {
        if (errors) return res.status(500).json({errors})
        return res.status(200).json({ results })
    })
})

router.get('/get-album-images/:id_album_images', (req, res) => {
    connection.query('SELECT * FROM album_images WHERE id_album_images = ?', [req.params.id_album_images], (errors, results, fields) => {
        if (errors) return res.status(500).json({errors})
        return res.status(200).json({ result : results[0] })
    })
})

router.post('/insert-album-images', (req, res) => {
    const body = req.body
    const values = [body.album_images, body.album_fk_id]
    connection.query('INSERT INTO album_images (album_images, album_fk_id) VALUES (?, ?)', values, (errors, results, fields) => {
        if (errors) return res.status(500).json({errors})
        return res.status(200).json({ id: results.insertId })
    })
})

router.put('/update-album-images', (req, res) => {
    const body = req.body
    const values = [body.album_images, body.album_fk_id, body.id_album_images]
    connection.query('UPDATE FROM album_imagenes SET album_images = ?, album_fk_id = ? WHERE id_album_images = ?', values, (errors, results, fields) => {
        if (errors) return res.status(500).json({ errors })
        return res.status(200).json({ result: `Changed rows: ${results.changedRows}` })
    })
})

router.delete('/delete-album-images/:id_album_images', (req, res) => {
    connection.query('DELETE FROM album_images WHERE id_album_images = ?', [req.params.id_album_images], (errors, results, fields) => {
        if (errors) return res.status(500).json({errors})
        return res.status(200).json({ result: results.affectedRows })
    })
})

module.exports = router