'use strict'

const router = require('express').Router();
const {modifySchedule, deleteSchedule, getSchedules, searchSchedule, createHeadquarter, modifyHeadquarter, deleteHeadquarter, getHeadquarterList, searchHeadquarter, getDepartments, getCities, getQuantitySpaces} = require('../controllers/headquarters.controller');
const { verifyToken } = require('../controllers/users.controller');

router.post('/schedules/createSchedule', verifyToken, createHeadquarter)
router.put('/schedules/modifySchedule', verifyToken, modifySchedule)
router.delete('/schedules/deleteSchedule', verifyToken, deleteSchedule)
router.get('/schedules/showSchedules', verifyToken, getSchedules)
router.get('/schedules/seachSchedule', verifyToken, searchSchedule)
router.post('/headquearters/create', verifyToken, createHeadquarter)
router.put('/headquarters/modify', verifyToken, modifyHeadquarter)
router.delete('/headquarters/delete', verifyToken, deleteHeadquarter)
router.get('/headquarters/list', verifyToken, getHeadquarterList)
router.get('/headquarters/search', verifyToken, searchHeadquarter)
router.get('/headquarters/departments/list', verifyToken, getDepartments)
router.post('/headquearters/cities/search', verifyToken, getCities)
router.post('/headquarters/spaces/quantity', verifyToken, getQuantitySpaces)

module.exports = router