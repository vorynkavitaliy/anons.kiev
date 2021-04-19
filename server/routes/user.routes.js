const passport = require('passport')
const { Router } = require('express')
const ctr = require('../controlers/users.controler')
const router = Router()

// /api/users/admin/
router.post('/login', ctr.loginUser)

router.post(
    '/admin/create',
    // passport.authenticate('jwt', { session: false }),
    ctr.createUser
)

router.get(
    '/admin/users',
    // passport.authenticate('jwt', { session: false }),
    ctr.getUsers
)

router.get(
    '/admin/user/:id',
    // passport.authenticate('jwt', { session: false }),
    ctr.getUsertById
)

router.put(
    '/admin/user/:id',
    // passport.authenticate('jwt', { session: false }),
    ctr.updateUser
)

router.delete(
    '/admin/user/:id',
    // passport.authenticate('jwt', { session: false }),
    ctr.removeUser
)

module.exports = router
