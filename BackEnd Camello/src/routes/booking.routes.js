'use strict'

const router = require('express').Router()
const {makeBooking, deleteBooking} = require('../controllers/bookings.controller')
const {verifyToken} = require('../controllers/users.controller')

router.post('/booking/make', verifyToken, makeBooking)
router.delete('/booking/delete', verifyToken, deleteBooking)

module.exports = router