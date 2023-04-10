'use strict'

const router = require('express').Router();
const {createSchedule, modifySchedule, deleteSchedule, getSchedules, searchSchedule, createHeadquarter, modifyHeadquarter, deleteHeadquarter, getHeadquarterList, searchHeadquarter} = require('../controllers/headquarters.controller');
const { verifyToken } = require('../controllers/users.controller');

router.post('/schedules/createSchedule', verifyToken, createSchedule)
router.put('/schedules/modifySchedule', verifyToken, modifySchedule)
router.delete('/schedules/deleteSchedule', verifyToken, deleteSchedule)
router.get('/schedules/showSchedules', verifyToken, getSchedules)
router.get('/schedules/seachSchedule', verifyToken, searchSchedule)
router.post('/headquearters/create', verifyToken, createHeadquarter)
router.put('/headquarters/modify', verifyToken, modifyHeadquarter)
router.delete('/headquarters/delete', verifyToken, deleteHeadquarter)
router.get('/headquarters/list', verifyToken, getHeadquarterList)
router.get('/headquarters/search', verifyToken, searchHeadquarter)

module.exports = router