const { Router } = require('express')
const Imgbb = require('imgbbjs')
const router = Router()

const connection = require('../db')

const imgbb = new Imgbb({
    key: 'fc44270a6f18e9401c79754693937f7c',
});

router.get('/get-album-images', (req, res) => {
    connection.query(`SELECT ai.id_album_images, ai.album_images, ai.img_name, ai.album_fk_id, u.username 
        FROM album_images ai JOIN album a ON ai.album_fk_id = a.album_id JOIN user u 
        ON a.user_fk_id = u.user_id`, (errors, results, fields) => {
        if (errors) return res.status(500).json({errors})
        return res.status(200).json({ results })
    })
})

router.get('/get-album-images-by-album/:album_fk_id', (req, res) => {
    connection.query('SELECT * FROM album_images WHERE album_fk_id = ?', [req.params.album_fk_id], (errors, results, fields) => {
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
    const values = [body.album_images, body.img_name, body.album_fk_id]
    imgbb.upload(values[0], values[1])
    .then(({data}) => {
        values[0] = data.url;
        connection.query('INSERT INTO album_images (album_images, img_name, album_fk_id) VALUES (?, ?, ?)', values, (errors, results, fields) => {
            if (errors) return res.status(500).json({errors})
            return res.status(200).json({ id: results.insertId })
        })
    }); 
})

router.put('/update-album-images', (req, res) => {
    const body = req.body
    const values = [body.album_images, body.img_name, body.album_fk_id, body.id_album_images]
    connection.query('UPDATE FROM album_imagenes SET album_images = ?, img_name = ?, album_fk_id = ? WHERE id_album_images = ?', values, (errors, results, fields) => {
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