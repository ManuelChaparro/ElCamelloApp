'use strict'

const router = require('express').Router();
const {createSchedule, modifySchedule, deleteSchedule, getSchedules, searchSchedule, createHeadquarter} = require('../controllers/headquarters.controller');
const { verifyToken } = require('../controllers/users.controller');

router.post('/schedules/createSchedule', verifyToken, createSchedule)
router.put('/schedules/modifySchedule', verifyToken, modifySchedule)
router.delete('/schedules/deleteSchedule', verifyToken, deleteSchedule)
router.get('/schedules/showSchedules', verifyToken, getSchedules)
router.get('/schedules/seachSchedule', verifyToken, searchSchedule)
router.post('/schedule/createHeadquarter', verifyToken, createHeadquarter)

module.exports = router