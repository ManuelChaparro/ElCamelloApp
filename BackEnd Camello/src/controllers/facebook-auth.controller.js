'use strict'
const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy
const express = require('express')
const connection = require('../../config/connections')
require('dotenv').config()

const facebookPass = passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_SECRET_KGEY,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL,
}, async(accessToken, refreshToken, profile, cb) =>{
    console.log(profile)
    await connection.query(`Select * from usuarios where email = ${connection.escape(profile.email)}`, async(err, result, fields) =>{
        if(!err){
            if(result.length === 0){
                await connection.query(`Insert into usuarios (nombres, apellidos, fecha_nacimiento, email, genero, tipo_documento, identificacion, telefono, rol) values (${connection.escape(profile.displayName)}, ${connection.escape(profile.displayName)}, NOW(), ${connection.escape(profile.email)}, 'M', 'C.C', '46378701', '3208317055', 'C')`)
                return cb(null, profile)
            }else{
                res.json({message: "El usuario de facebook ya tiene una cuenta existente"})
                return cb(null, profile)
            }
        }else{
            res.json({message: "Ha ocurrido un error al validar la existencia del usuario"})
        }
    })
}))

module.exports = {facebookPass}