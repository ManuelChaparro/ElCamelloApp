'use strict'

const router = require('express').Router()
const { clientQuantityPerHeadquarter, moneyPerHeadquarter, bookingPerMonth, spacesPerHeadquarter } = require('../controllers/reports.controller.js')
const { verifyToken } = require('../controllers/users.controller')

router.post('/reports/1', verifyToken, clientQuantityPerHeadquarter)
router.post('/reports/2', verifyToken, moneyPerHeadquarter)
router.post('/reports/3', verifyToken, bookingPerMonth)
router.post('/reports/4', verifyToken, spacesPerHeadquarter)

module.exports = router