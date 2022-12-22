const router = require(`express`).Router()

const { login, dashboard } = require(`../controllers/main.js`)

const authMiddleware = require(`../middleware/auth.js`)

router.route(`/dashboard`).get(authMiddleware, dashboard)
router.route(`/login`).post(login)

// exports
module.exports = router