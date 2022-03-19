const userRoutes = require('./user-routes')
const thoughtRoutes = require('./thought-routes')
const router = require('express').Router();
router.use('/user', userRoutes)
router.use('/thought', thoughtRoutes)

module.exports = router;