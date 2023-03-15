'use strict'

const {json} = require('express');
const jwt = require('jsonwebtoken');
const crypto = require("crypto");
const connection = require('../../config/connections.js');

const registerUser = async (req, res) =>{
    const userBody = req.body;
    await connection.query(`SELECT nombres FROM usuarios WHERE email = ${connection.escape(userBody.email)};`, async (error, result, fields) =>{
        if(result.length === 0){
            try {
                await connection.query(`Insert into usuarios (nombres, apellidos, fecha_nacimiento, email, genero, tipo_documento, identificacion, telefono, rol) values (${connection.escape(userBody.nombres)}, ${connection.escape(userBody.apellidos)}, ${connection.escape(userBody.fecha_nacimiento)}, ${connection.escape(userBody.email)}, ${connection.escape(userBody.genero)}, ${connection.escape(userBody.identificacion)}, ${connection.escape(userBody.tipo_documento)}, ${connection.escape(userBody.telefono)}, ${connection.escape(userBody.rol)})`, async (error, result, fields) =>{
                    if(!error){
                        let pwd_binary = crypto.createHash('sha256').update(userBody.password).digest('hex')
                        let email_binary = crypto.createHash('sha256').update(userBody.email).digest('hex')
                        await connection.query(`Insert into passwords (password, indicador) values ("${pwd_binary}", "${email_binary}")`, (error, result, fields) =>{
                            if(!error){
                                res.json({message: `Se ha insertado correctamente los datos de ${connection.escape(userBody.nombres)}`})
                            }else{
                                res.json({message: error})
                            }
                        })
                    }else{
                        res.json({message: error})
                    }
                });
            }catch (error) {
                res.json({message: `Ha ocurrido un error: ${error}`});
            }
        }else{
            res.json({message: `El usuario ${connection.escape(userBody.nombres)} ya existe.`})
        }
    })
}

const modifyUser = async(req, res) =>{
    const userBody = req.body
    const {email} = req.body
    jwt.verify(req.token, 'secretkey', async (error) => {
        if(!error){
            await connection.query(`SELECT nombres FROM usuarios WHERE email = ${connection.escape(email)};`, async (error, result, fields) =>{
                if(result.length === 1){
                    try{
                        await connection.query(`update usuarios set nombres = ${connection.escape(userBody.nombres)}, apellidos = ${connection.escape(userBody.apellidos)}, genero = ${connection.escape(userBody.genero)}, telefono = ${connection.escape(userBody.telefono)} where email = ${connection.escape(email)}`, (error, result, fields) =>{
                            res.json({message:`Se ha modificado correctamente el usuario`});
                        });
                    }catch(error){
                        res.json({message: `Ha ocurrido un error: ${error}`});
                    }
                }else{
                    res.json({message: "El usuario que intenta modificar, no existe."})
                }
            })
        }else{
            res.json({message: "No tiene autorización para ingresar"})
        }
    })
}

const loginUser = async (req, res) => {
    const {email, password} = req.body;
    let email_binary = crypto.createHash('sha256').update(email).digest('hex')
    await connection.query(`Select password from passwords where indicador = ${connection.escape(email_binary)}`, async (error, result, fields) =>{
        if(result.length === 1){
            if(result[0].password === crypto.createHash('sha256').update(password).digest('hex')){
                await connection.query(`Select * from usuarios where email = ${connection.escape(email)}`, (error, infoUser, fields) =>{
                    jwt.sign({infoUser}, 'secretkey',{expiresIn: '1h'}, (err, token) => {
                        res.json({token: token});
                    });
                })
            }else{
                res.json({message: "Contraseña incorrecta"})
            }
        }else{
            res.json({message: "Email incorrecto"})
        }
    })
}

const deleteUser = async(req, res) =>{
    const {email, password} = req.body
    jwt.verify(req.token, 'secretkey', async (error) => {
        if(!error){
            let email_binary = crypto.createHash('sha256').update(email).digest('hex')
            await connection.query(`Select password from passwords where indicador = ${connection.escape(email_binary)}`, async (error, result, fields) =>{
            if(result.length === 1){
                if(result[0].password === crypto.createHash('sha256').update(password).digest('hex')){
                    await connection.query(`Select * from usuarios where email = ${connection.escape(email)}`, async (error, infoUser, fields) =>{
                        await connection.query(`delete from usuarios where email = ${connection.escape(email)}`)
                        await connection.query(`delete from passwords where indicador = ${connection.escape(email_binary)}`)
                        res.json({message: "Usuario eliminado correctamente"})
                    })
                }else{
                    res.json({message: "Contraseña incorrecta"})
                }
            }else{
                res.json({message: "Email incorrecto"})
            }  
            })
        }else{
            res.json({message: "No tiene autorización para ingresar"})
        }
    })
}

// AUthorization: Bearer <token>
const verifyToken = (req, res, next) =>{
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const bearerToken = bearerHeader.split(" ")[1];
        req.token = bearerToken;
        next();
    }else{
        res.sendStatus(403);
    }
}

const convertBinary = (string) => {
    return string.split('').map(function (char) {
        return char.charCodeAt(0).toString(2);
    });
}


module.exports = {registerUser, verifyToken, loginUser, modifyUser, deleteUser};