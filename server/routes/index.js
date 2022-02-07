const express = require('express')
const router = express.Router({mergeParams: true})

router.use('/auth', require('./auth.routes'))
router.use('/lists', require('./lists.routes'))
router.use('/tasks', require('./tasks.routes'))
router.use('/user', require('./user.routes'))

module.exports = router
