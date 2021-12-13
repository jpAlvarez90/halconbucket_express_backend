const express = require('express')
const cors = require('cors')

const app = express()

const PORT = 3000 

// Middlewares
app.use(express.json({limit: '50mb'}))
app.use(cors())

// Routes
app.use(require('./routes/roles'))
app.use(require('./routes/user'))
app.use(require('./routes/album'))
app.use(require('./routes/album_images'))
app.use(require('./routes/followers'))

//Login route
app.use(require('./routes/login'))

app.listen(PORT, '0.0.0.0', () => {
    console.log(`HalconBucket Server running on port ${PORT}`)
})