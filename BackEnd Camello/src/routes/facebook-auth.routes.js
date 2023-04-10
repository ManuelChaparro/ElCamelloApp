'use strict'

const router = require('express').Router()
const {facebookPass} = require('../controllers/facebook-auth.controller')

router.get('/', facebookPass.authenticate('facebook', {scope: 'email'}))
router.get('/callback', facebookPass.authenticate('facebook', { failureRedirection: '/error',}), (req, res) =>{
    console.log("por aca paso")
    res.redirect('/success')
})
router.get('/success', async(req, res) =>{
    console.log("entro exitosamente")
    res.json({message: "loggin exitoso"})
})
router.get('/error', (req, res) =>{res.send('Error en loggin con facebook')})
router.get('/signout', (req, res) =>{
    res.json({message: "Ha cerrado sesion"})
})

module.exports = router