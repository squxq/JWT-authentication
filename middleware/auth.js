const jwt = require(`jsonwebtoken`)
const { UnauthenticatedError } = require(`../errors`)

const autheticationMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization
    // 400 - bad request || 401 - authorization error
    if (!authHeader || !authHeader.startsWith(`Bearer `)) { throw new UnauthenticatedError(`No token provided`) }
    // get the token
    const token = authHeader.split(` `)[1]

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET) // token and the secret string
        const { id, username } = decoded
        req.user = { id, username }
        next()
    } catch (error) {
        throw new UnauthenticatedError(`Not authorized to access this route.`)
    }

}

module.exports = autheticationMiddleware