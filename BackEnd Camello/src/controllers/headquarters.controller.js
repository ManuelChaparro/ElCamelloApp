'use strict'

const {json} = require('express');
const jwt = require('jsonwebtoken');
const connection = require('../../config/connections.js');

const createSchedule = async(req, res) =>{
    const {schedule_name, start_date, end_date, rol, id_user} = req.body
    jwt.verify(req.token, 'secretkey', async(error)=>{
        if(!error){
            if(rol === "A" || rol === "a"){
                await connection.query(`Insert into horarios (nombre, fecha_inicio, fecha_final) values (${connection.escape(schedule_name)}, ${connection.escape(start_date)}, ${connection.escape(end_date)})`, async(err, result, fields) =>{
                    if(!err){
                        await connection.query(`Insert into user_logs (id_usuario, fecha, estado, descripción) values (${id_user}, NOW(), "Agregacion", 'Se agregó el horario ${connection.escape(schedule_name)} a la tabla de horarios')`, async(error, info, fields) =>{
                            if(!error){
                                res.json({message: "Se ha ingresado correctamente el horario"})
                            }else{
                                res.json({message: "Error log"})
                            }
                        })
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
    const {id_schedule, new_day, new_opening_time, new_closing_time, rol, id_user} = req.body
    jwt.verify(req.token, 'secretkey', async(error)=>{
        if(!error){
            if(rol === "A" || rol === "a"){
                await connection.query(`select * from horarios where id_horario = ${connection.escape(id_schedule)}`, async(err, result, fields) =>{
                    if(!err){
                        if(result.length === 1){
                            await connection.query(`update horarios set jornada = ${connection.escape(new_day)}, hora_apertura = ${connection.escape(new_opening_time)}, hora_cierre = ${connection.escape(new_closing_time)}`, async(err, result, fields) =>{
                                if(!err){
                                    await connection.query(`Insert into user_logs (id_usuario, fecha, estado, descripción) values (${id_user}, NOW(), "Modificacion", "Se modifico el horario ${connection.escape(day)} en la tabla de horarios")`, async(error, info, fields) =>{
                                        if(!error){
                                            res.json({message: "Se modifico correctamente el horario"})
                                        }else{
                                            res.json({message: "Error log"})
                                        }
                                    })
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
    const {day, schedule_id, rol, id_user} = req.body
    jwt.verify(req.token, 'secretkey', async(error) =>{
        if(!error){
            if(rol === "A" || rol === "a"){
                await connection.query(`select * from horarios where jornada = ${connection.escape(day)}`, async(error, result, fields) =>{
                    if(!error){
                        if(result.length === 1){
                            await connection.query(`delete from horarios where id_horario = ${connection.escape(schedule_id)}`, async(err, info, fields) =>{
                                if(!err){
                                    await connection.query(`Insert into user_logs (id_usuario, fecha, estado, descripción) values (${id_user}, NOW(), "Eliminacion", "Se elimino el horario ${connection.escape(schedule_id)} de la tabla de horarios")`, async(error, info, fields) =>{
                                        if(!error){
                                            res.json({message: "Se elimino correctamente el horario"})
                                        }else{
                                            res.json({message: "Error log"})
                                        }
                                    })
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
    const {day} = req.body
    jwt.verify(req.token, 'secretkey', async(error) =>{
        if(!error){
            await connection.query(`Select * from horarios where jornada = ${connection.escape(day)}`, async(error, result, fields) =>{
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


const schedulesList = [
    { dia: 'Lunes', firstOpen: '', firstClose: '', secondOpen: '', secondClose: '' },
    { dia: 'Martes', firstOpen: '', firstClose: '', secondOpen: '', secondClose: '' },
    { dia: 'Miércoles', firstOpen: '', firstClose: '', secondOpen: '', secondClose: '' },
    { dia: 'Jueves', firstOpen: '', firstClose: '', secondOpen: '', secondClose: '' },
    { dia: 'Viernes', firstOpen: '', firstClose: '', secondOpen: '', secondClose: '' },
    { dia: 'Sábado', firstOpen: '', firstClose: '', secondOpen: '', secondClose: '' },
    { dia: 'Domingo', firstOpen: '', firstClose: '', secondOpen: '', secondClose: '' }
];


const createHeadquarter = async(req, res) =>{
    const {headquater_name, description, city, address, schedules, rol, id_user} = req.body
    jwt.verify(req.token, 'secretkey', async(error)=>{
        if(!error){
            if(rol === "A" || rol === "a"){
                await connection.query(`Insert into sedes (nombre, descripcion) values (${connection.escape(headquater_name)}, ${connection.escape(description)})`, async(err, result, fields) =>{
                    let idHeadquearter = result.insertId
                    await connection.query(`Insert into ciudades_sedes (id_ciudad, id_sede, direccion) values (${connection.escape(city)}, ${connection.escape(idHeadquearter)}, ${connection.escape(address)})`)
                    for (let i = 0; i < schedulesList.length; i++) {
                        const day = schedulesList[i].dia
                        const openningTimeMorning = schedulesList[i].firstOpen;
                        const closingTimeMorning = schedulesList[i].firstClose;
                        const openningTimeEvening = schedulesList[i].secondOpen;
                        const closingTimeEvening = schedulesList[i].secondClose;
                        await connection.query(`Insert into horarios(jornada, hora_apertura, hora_cierre) values ("Mañana", ${connection.escape(openningTimeMorning)}, ${connection.escape(closingTimeMorning)})`, async(error, result, fields)=>{
                            let idMorningSchedule = result.insertId
                            await connection.query(`Insert into horarios_sede (id_sede, id_horario, dia) values (${connection.escape(idHeadquearter)}, ${connection.escape(idMorningSchedule)}, ${connection.escape(day)})`)
                        })
                        await connection.query(`Insert into horarios(jornada, hora_apertura, hora_cierre) values ("Tarde", ${connection.escape(openningTimeEvening)}, ${connection.escape(closingTimeEvening)})`, async(error, result, fields)=>{
                            let idEveningSchedule = result.insertId
                            await connection.query(`Insert into horarios_sede (id_sede, id_horario, dia) values (${connection.escape(idHeadquearter)}, ${connection.escape(idEveningSchedule)}, ${connection.escape(day)})`)
                        })
                    }
                    res.json({message: "Se agrego correctamente la sede"})
                })
            }else{
                res.json({message: "No tiene los permisos para realizar esta acción"})
            }
        }else{
            res.json({message: "No tiene autorización para ingresar"})
        }
    })
}

/*
if(!err){
    await connection.query(`Insert into user_logs (id_usuario, fecha, estado, descripción) values (${id_user}, NOW(), "Agregacion", "Se agrego la sede ${connection.escape(headquater_name)} a la tabla de sedes")`, async(error, info, fields) =>{
        if(!error){
            res.json({message: "Se ha creado correctamente la sede"})
        }else{
            res.json({message: "Error log"})
        }
    })
}else{
    res.json({message: "Ha ocurrido un problema al crear la sede"})
}
*/

const modifyHeadquarter = async(req, res) =>{
    const {headquarter_id, headquarter_schedule_id, headquater_new_name, new_adress, rol, id_user} = req.body
    jwt.verify(req.token, 'secretkey', async(error) =>{
        if(!error){
            if(rol === "A" || rol === "a"){
                await connection.query(`Select * from sedes where id_sede = ${connection.escape(headquarter_id)}`, async(err, result, fields) =>{
                    if(!err){
                        if(result.length === 1){
                            await connection.query(`Update sedes set id_horario = ${connection.escape(headquarter_schedule_id)}, direccion = ${connection.escape(new_adress)}, nombre = ${connection.escape(headquater_new_name)}`, async(err, results, fields) =>{
                                if(!err){
                                    await connection.query(`Insert into user_logs (id_usuario, fecha, estado, descripción) values (${id_user}, NOW(), "Modificacion", "Se modifico la sede ${connection.escape(headquater_new_name)} de la tabla de sedes")`, async(error, info, fields) =>{
                                        if(!error){
                                            res.json({message: "Se modifico correctamente la sede"})
                                        }else{
                                            res.json({message: "Error log"})
                                        }
                                    })
                                }else{
                                    res.json({message: "No fue posible modificar la sede"})
                                }
                            })
                        }else{
                            res.json({message: "La sede que intenta modificar no existe"})
                        }
                    }else{
                        res.json({message: "Ha ocurrido un error al buscar la sede que desea modificar"})
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

const deleteHeadquarter = async(req, res) =>{
    const {headquarter_id, rol} = req.body
    jwt.verify(req.token, 'secretkey', async(error) =>{
        if(!error){
            if(rol === "A" || rol === "a"){
                await connection.query(`select * from sedes id_sede = ${connection.escape(headquarter_id)}`, async(err, result, fields) =>{
                    if(!err){
                        if(result.length === 1){
                            await connection.query(`Delete from sedes where id_sede = ${connection.escape(headquarter_id)}`, async(error, finalResult, fields) =>{
                                if(!error){
                                    await connection.query(`Insert into user_logs (id_usuario, fecha, estado, descripción) values (${id_user}, NOW(), "Eliminacion", "Se elimino la sede ${connection.escape(headquarter_id)} de la tabla de sedes")`, async(error, info, fields) =>{
                                        if(!error){
                                            res.json({message: "Se elimino correctamente la sede"})
                                        }else{
                                            res.json({message: "Error log"})
                                        }
                                    })
                                }else{
                                    res.json({message: "No fue posible eliminar la sede"})
                                }
                            })
                        }else{
                            res.json({message: "La sede que intenta eliminar no existe"})
                        }
                    }else{
                        res.json({message: "Ha ocurrido un error al buscar la sede que desea eliminar"})
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

const getHeadquarterList = async(req, res) =>{
    jwt.verify(req.token, 'secretkey', async(error) =>{
        if(!error){
            await connection.query(`select s.nombre as nombre_sede, cs.direccion, hs.nombre as horario, h.fecha_inicio as apertura, h.fecha_final as cierre from sedes s, horarios h where s.id_horario = h.id_horario`, async(err, list, fields) =>{
                if(!err){
                    if(list.length >= 1){
                        res.json(list)
                    }else{
                        res.json({message: "La lista de sedes esta vacia"})
                    }
                }else{
                    res.json({message: "Ha ocurrido un error al buscar la lista de sedes"})
                }
            })
        }else{
            res.json({message: "No tiene autorización para ingresar"})
        }
    })
}

const searchHeadquarter = async(req, res) => {
    const{headquarter_id} = req.body
    jwt.verify(req.token, 'secretkey', async(error) => {
        if(!error){
            await connection.query(`select s.nombre as nombre_sede, s.direccion, h.nombre as horario, h.fecha_inicio as apertura, h.fecha_final as cierre from sedes s, horarios h where s.id_horario = h.id_horario and s.id_sede = ${connection.escape(headquarter_id)}`, async(error, result, fiedls) =>{
                if(!error){
                    if(result.length === 1){
                        res.json(result)
                    }else{
                        res.json({message: "La sede que busca no existe"})
                    }
                }else{
                    res.json({message: "Ha ocurrido un error al buscar la sede"})
                }
            })
        }else{
            res.json({message: "No tiene autorización para ingresar"})
        }
    })
}

module.exports ={createSchedule, modifySchedule, deleteSchedule, getSchedules, searchSchedule, createHeadquarter, modifyHeadquarter, deleteHeadquarter, getHeadquarterList, searchHeadquarter}