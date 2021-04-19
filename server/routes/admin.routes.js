const { Router } = require('express')
const ctr = require('../controlers/admin.controler')
const router = Router()

// /api/admin/
router.post('/login', ctr.loginAdmin)

router.post('/create', ctr.createAdmin)

module.exports = router
