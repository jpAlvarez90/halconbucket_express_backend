const { Router } = require('express')
const Imgbb = require('imgbbjs')
const router = Router()

const connection = require('../db')

const imgbb = new Imgbb({
    key: 'fc44270a6f18e9401c79754693937f7c',
});

router.get('/get-albums', (req, res) => {
    connection.query('SELECT * FROM album', (errors, results, fields) => {
        if (errors) return res.status(500).json(errors)
        return res.status(200).json({results})
    })
})

router.get('/get-album/:album_id', (req, res) => {
    connection.query('SELECT * FROM album WHERE album_id = ?', req.params.album_id, (errors, results, fields) => {
        if (errors) return res.status(500).json(errors)
        return res.status(200).json({ result: results[0] })
    })
})

router.get('/get-album-by-user/:user_fk_id', (req, res) => {
    connection.query('SELECT * FROM album a JOIN user u ON a.user_fk_id = u.user_id WHERE user_fk_id = ?',
     req.params.user_fk_id, (errors, results, fields) => {
        if (errors) return res.status(500).json(errors)
        return res.status(200).json({ result: results })
    })
})

router.post('/insert-album', (req, res) => {
    const body = req.body
    const values = [body.album_name, body.url_cover, body.user_fk_id]
    imgbb.upload(values[1], values[0])
    .then(({data}) => {
        values[1] = data.url;
        connection.query('INSERT INTO album (album_name, url_cover, user_fk_id) VALUES (?, ?, ?)', values, (errors, results, fields) => {
            if (errors) return res.status(500).json(errors)
            return res.status(200).json({ id: results.insertId })
        })
    }); 

})

router.put('/update-album', (req, res) => {
    const body = req.body
    const values = [body.album_name, body.url_cover, body.album_id]
    connection.query('UPDATE album SET album_name = ?, url_cover = ?, WHERE album_id = ?', values, (errors, results, fields) => {
        if (errors) return res.status(500).json({ errors })
        return res.status(200).json({ result: `Changed rows: ${results.changedRows}` })
    })
})

router.delete('/delete-album/:album_id', (req, res) => {
    connection.query('DELETE FROM album WHERE album_id = ?', [req.params.album_id], (errors, results, fields) => {
        if(errors) return res.status(500).json({ error: errors })
        return res.status(200).json({ result: results.affectedRows })
    })
})

module.exports = router