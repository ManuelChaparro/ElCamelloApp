'use strict'

const {json} = require('express');
const jwt = require('jsonwebtoken');
const crypto = require("crypto");
const connection = require('../../config/connections.js');
const nodemailer = require('nodemailer');

const createSchedule = async(req, res) =>{
    const {schedule_name, start_date, end_date, rol} = req.body
    jwt.verify(req.token, 'secretkey', async(error)=>{
        if(!error){
            if(rol === "A" || rol === "a"){
                await connection.query(`Insert into horarios (nombre, fecha_inicio, fecha_final) values (${connection.escape(schedule_name)}, ${connection.escape(start_date)}, ${connection.escape(end_date)})`, async(err, result, fields) =>{
                    if(!err){
                        res.json({message: "Se ha ingresado correctamente el horario"})
                    }else{
                        res.json({message: "Ha ocurrido un error al ingresar un nuevo horario"})
                    }
                })
            }else{
                res.json({message: "No tiene los permisos para realizar esta acción"})
            }
        }else{
            res.json({message: "No tiene autorización para ingresar"})
        }
    })
}

const modifySchedule = async(req, res) =>{
    const {id_schedule, schedule_name, start_date, end_date, rol} = req.body
    jwt.verify(req.token, 'secretkey', async(error)=>{
        if(!error){
            if(rol === "A" || rol === "a"){
                await connection.query(`select * from horarios where id_horario = ${connection.escape(id_schedule)}`, async(err, result, fields) =>{
                    if(!err){
                        if(result.length === 1){
                            await connection.query(`update horarios set nombre = ${connection.escape(schedule_name)}, fecha_inicio = ${connection.escape(start_date)}, fecha_final = ${connection.escape(end_date)}`, async(err, result, fields) =>{
                                if(!err){
                                    res.json({message: "Se modifico correctamente el horario"})
                                }else{
                                    res.json({message: "No se pudo modifcar el horario deseado"})
                                }
                            })
                        }else{
                            res.json({message: "El horario que intenta modificar no existe"})
                        }
                    }else{
                        res.json({message: "Ha ocurrido un error al buscar el horario que desea modificar"})
                    }
                })
            }else{
                res.json({message: "No tiene los permisos para realizar esta acción"})
            }
        }else{
            res.json({message: "No tiene autorización para ingresar"})
        }
    })
}

const deleteSchedule = async(req, res) =>{
    const {schedule_name, rol} = req.body
    jwt.verify(req.token, 'secretkey', async(error) =>{
        if(!error){
            if(rol === "A" || rol === "a"){
                await connection.query(`select * from horarios where nombre = ${connection.escape(schedule_name)}`, async(error, result, fields) =>{
                    if(!error){
                        if(result.length === 1){
                            await connection.query(`delete from horarios where nombre = ${connection.escape(schedule_name)}`, async(err, info, fields) =>{
                                if(!err){
                                    res.json({message: "El horario se ha eliminado correctamente"})
                                }else{
                                    res.json({message: "No se pudo eliminar el horario deseado"})
                                }
                            })
                        }else{
                            res.json({message: "El horario que intenta eliminar no existe"})
                        }
                    }else{
                        res.json({message: "Ha ocurrido un error al buscar el horario que desea eliminar"})
                    }
                })
            }else{
                res.json({message: "No tiene los permisos para realizar esta acción"})
            }
        }else{
            res.json({message: "No tiene autorización para ingresar"})
        }
    })
}

const getSchedules = async(req, res) =>{
    jwt.verify(req.token, 'secretkey', async(error) =>{
        if(!error){
            await connection.query(`Select * from horarios`, async(err, result, fields) =>{
                if(!err){
                    res.json(result)
                }else{
                    res.json({message: "Ha ocurrido un error al buscar la lista de horarios"})
                }
            })
        }else{
            res.json({message: "No tiene autorización para ingresar"})
        }
    })
}

const searchSchedule = async(req, res) =>{
    const {schedule_name} = req.body
    jwt.verify(req.token, 'secretkey', async(error) =>{
        if(!error){
            await connection.query(`Select * from horarios where nombre = ${connection.escape(schedule_name)}`, async(error, result, fields) =>{
                if(!error){
                    if(result.length === 1){
                        res.json(result)
                    }
                }else{
                    res.json({message: "Ha ocurrido un error al buscar el horario deseado"})
                }
            })
        }else{
            res.json({message: "No tiene autorización para ingresar"})
        }
    })
}

const createHeadquarter = async(req, res) =>{
    const {headquater_name, address, schedule_id} = req.body
    jwt.verify(req.token, 'secretkey', async(error)=>{
        if(!error){
            if(rol === "A" || rol === "a"){
                await connection.query(`Insert into sedes (id_horario, direccion, nombre) values (${connection.escape(schedule_id)}, ${connection.escape(address)}, ${connection.escape(headquater_name)})`, async(err, result, fields) =>{
                    if(!err){
                        res.json({message: "Se ha creado correctamente la sede"})
                    }else{
                        res.json({message: "Ha ocurrido un problema al crear la sede"})
                    }
                })
            }else{
                res.json({message: "No tiene los permisos para realizar esta acción"})
            }
        }else{
            res.json({message: "No tiene autorización para ingresar"})
        }
    })
}

module.exports = {createSchedule, modifySchedule, deleteSchedule, getSchedules, searchSchedule, createHeadquarter}