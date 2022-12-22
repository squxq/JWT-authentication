// check username, password in post(login) request
// if exist create new JWT
// send back to front-end

// setup authetication so only the request with JWT can access the dashboard

const jwt = require(`jsonwebtoken`)
const { BadRequestError } = require(`../errors`)

const login = async (req, res) => {
    const { username, password } = req.body
    // mongoose validation
    // joi - package
    // check in the controller
    if (!username || !password) {throw new BadRequestError(`Please provide username and password.`)} // bad request

    // create an ID
    const id = new Date().getTime()
    // provide a payload - good idea to keep them small
    const token = jwt.sign(
        {id, username},
        process.env.JWT_SECRET, // this is the signature
        { expiresIn: '30d' },
        )

    res.status(200).json({
        msg: `user created`,
        token,
    })
}

const dashboard = async (req, res) => {
    const luckyNumber = Math.floor(Math.random() * 100)
    res
        .status(200).json({
        msg: `Hello, ${req.user.username}.`,
        secret: `Here is your authorized data, your lucky number is ${luckyNumber}.`
    })
}

// exports
module.exports = {
    login,
    dashboard
}