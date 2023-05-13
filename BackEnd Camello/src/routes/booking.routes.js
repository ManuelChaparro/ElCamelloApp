'use strict'

const router = require('express').Router()
const {makeBooking, deleteBooking, getBookingList, modifyBooking, searchBooking} = require('../controllers/bookings.controller')
const {verifyToken} = require('../controllers/users.controller')

router.post('/booking/make', verifyToken, makeBooking)
router.delete('/booking/delete', verifyToken, deleteBooking)
router.get('/booking/list', verifyToken, getBookingList)
router.put('/booking/modify', verifyToken, modifyBooking)
router.post('/booking/search', verifyToken, searchBooking)

module.exports = router