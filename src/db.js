const mysql = require('mysql')

module.exports = mysql.createConnection({
    host: 'localhost', 
    user: 'TestUser',
    password: 'root',
    database: 'halcon_bucket'
})