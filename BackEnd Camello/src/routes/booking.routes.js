'use strict'

const router = require('express').Router()
const {makeBooking, deleteBooking, getBookingList, modifyBooking, searchBooking, getBill, getBillList} = require('../controllers/bookings.controller')
const {verifyToken} = require('../controllers/users.controller')

router.post('/booking/make', verifyToken, makeBooking)
router.post('/booking/delete', verifyToken, deleteBooking)
router.get('/booking/list', verifyToken, getBookingList)
router.put('/booking/modify', verifyToken, modifyBooking)
router.post('/booking/search', verifyToken, searchBooking)
router.post('/booking/bill/search', verifyToken, getBill)
router.get('/booking/bill/list', verifyToken, getBillList)

module.exports = router