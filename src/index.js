const express = require('express')

const app = express()

const PORT = 3000 

// Middlewares
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Routes
app.use(require('./routes/roles'))
app.use(require('./routes/user'))
app.use(require('./routes/album'))
app.use(require('./routes/album_images'))
app.use(require('./routes/followers'))

app.listen(PORT, '0.0.0.0', () => {
    console.log('HalconBucket Server running on port ' + PORT)
})