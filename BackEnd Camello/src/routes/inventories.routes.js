'use strict'

const router = require('express').Router()
const { createProduct, modifyProduct, deleteProduct, getProductList, createInventary} = require('../controllers/inventories.controller')
const {verifyToken} = require('../controllers/users.controller')

router.post('/inventary/product/add', verifyToken, createProduct)
router.put('/inventary/product/modify', verifyToken, modifyProduct)
router.delete('/inventary/product/delete', verifyToken, deleteProduct)
router.get('/inventary/product/list', verifyToken, getProductList)
router.post('/inventary/create', verifyToken, createInventary)

module.exports = router