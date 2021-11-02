const jwt = require('jsonwebtoken')

exports.SECRET = 'HALCONBUCKET'

exports.getUserFromToken = async (token) => {
    if (!token) return new Error('No token provided')

    const sToken = token.split('Bearer ')[1]
    if (!sToken) return new Error('Token not provided')

    const user = await jwt.verify(sToken, SECRET, (err, decoded) => {
        if (err) throw new Error('Invalid token')
        return decoded
    })
    return user
}