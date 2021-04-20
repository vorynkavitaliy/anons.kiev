const { Router } = require('express')
const ctr = require('../controlers/currency.controler')
const router = Router()

// /api/currency/
router.get('/', ctr.getCurrences)

router.put('/', ctr.updateCurrences)

module.exports = router
