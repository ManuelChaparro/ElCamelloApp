'use strict'

const {json} = require('express');
const jwt = require('jsonwebtoken');
const connection = require('../../config/connections.js');

const createSchedule = async(req, res) =>{
    const {working_day, opening_time, closing_time, rol, id_user} = req.body
    jwt.verify(req.token, 'secretkey', async(error)=>{
        if(!error){
            if(rol === "A" || rol === "a"){
                await connection.query(`Insert into horarios (jornada, hora_apertura, hora_cierre) values (${connection.escape(working_day)}, ${connection.escape(opening_time)}, ${connection.escape(closing_time)})`, async(err, result, fields) =>{
                    if(!err){
                        await connection.query(`Insert into user_logs (id_usuario, fecha, estado, descripción) values (${id_user}, NOW(), "Agregacion", 'Se agregó el horario ${connection.escape(working_day)} a la tabla de horarios')`, async(error, info, fields) =>{
                            if(!error){
                                res.json({message: "0"})
                            }else{
                                res.json({message: "1"})
                            }
                        })
                    }else{
                        res.json({message: "1"})
                    }
                })
            }else{
                res.json({message: "1"})
            }
        }else{
            res.json({message: "1"})
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
                                            res.json({message: "0"})
                                        }else{
                                            res.json({message: "1"})
                                        }
                                    })
                                }else{
                                    res.json({message: "1"})
                                }
                            })
                        }else{
                            res.json({message: "1"})
                        }
                    }else{
                        res.json({message: "1"})
                    }
                })
            }else{
                res.json({message: "1"})
            }
        }else{
            res.json({message: "1"})
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
                                            res.json({message: "0"})
                                        }else{
                                            res.json({message: "1"})
                                        }
                                    })
                                }else{
                                    res.json({message: "1"})
                                }
                            })
                        }else{
                            res.json({message: "1"})
                        }
                    }else{
                        res.json({message: "1"})
                    }
                })
            }else{
                res.json({message: "1"})
            }
        }else{
            res.json({message: "1"})
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
                    res.json({message: "1"})
                }
            })
        }else{
            res.json({message: "1"})
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
                    res.json({message: "1"})
                }
            })
        }else{
            res.json({message: "1"})
        }
    })
}

const createHeadquarter = async(req, res) =>{
    const {headquater_name, description, city, address, rol, id_user} = req.body
    jwt.verify(req.token, 'secretkey', async(error)=>{
        if(!error){
            if(rol === "A" || rol === "a"){
                await connection.query(`Select * from sedes where nombre = ${connection.escape(headquater_name)}`, async(error, validation, fields) =>{
                    if(!error){
                        if(validation.length === 0){
                            await connection.query(`Insert into sedes (nombre, descripcion) values (${connection.escape(headquater_name)}, ${connection.escape(description)})`, async(err, result, fields) =>{
                                if(!error){
                                    let idHeadquearter = result.insertId
                                    await connection.query(`Insert into ciudades_sedes (id_ciudad, id_sede, direccion) values (${connection.escape(city)}, ${connection.escape(idHeadquearter)}, ${connection.escape(address)})`, async(error, result, fields) =>{
                                        if(!error){
                                            if(!err){
                                                await connection.query(`Insert into user_logs (id_usuario, fecha, estado, descripcion) values (${id_user}, NOW(), "Agregacion", "Se agrego la sede ${connection.escape(headquater_name)} a la tabla de sedes")`, async(error, info, fields) =>{
                                                    if(!error){
                                                        res.json({message: idHeadquearter})
                                                    }else{
                                                        res.json({message: error})
                                                    }
                                                })
                                            }else{
                                                res.json({message: "2"})
                                            }
                                        }else{
                                            res.json({message: error})
                                        }
                                    })
                                }else{
                                    res.json({message: "4"})
                                }
                            })
                        }else{
                            res.json({message: "5"})
                        }
                    }else{
                        res.json({message: "6"})
                    }
                })
            }else{
                res.json({message: "7"})
            }
        }else{
            res.json({message: "8"})
        }
    })
}

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
                                    await connection.query(`Insert into user_logs (id_usuario, fecha, estado, descripcion) values (${id_user}, NOW(), "Modificacion", "Se modifico la sede ${connection.escape(headquater_new_name)} de la tabla de sedes")`, async(error, info, fields) =>{
                                        if(!error){
                                            res.json({message: "0"})
                                        }else{
                                            res.json({message: "1"})
                                        }
                                    })
                                }else{
                                    res.json({message: "1"})
                                }
                            })
                        }else{
                            res.json({message: "1"})
                        }
                    }else{
                        res.json({message: "1"})
                    }
                })
            }else{
                res.json({message: "1"})
            }
        }else{
            res.json({message: "1"})
        }
    })
}

const deleteHeadquarter = async(req, res) =>{
    const {headquarter_id, rol, id_user} = req.body
    jwt.verify(req.token, 'secretkey', async(error) =>{
        if(!error){
            if(rol === "A" || rol === "a"){
                await connection.query(`select * from sedes where id_sede = ${connection.escape(headquarter_id)}`, async(err, result, fields) =>{
                    if(!err){
                        if(result.length === 1){
                            await connection.query(`Delete from sedes where id_sede = ${connection.escape(headquarter_id)}`, async(error, finalResult, fields) =>{
                                if(!error){
                                    await connection.query(`Insert into user_logs (id_usuario, fecha, estado, descripcion) values (${id_user}, NOW(), "Eliminacion", "Se elimino la sede ${connection.escape(headquarter_id)} de la tabla de sedes")`, async(error, info, fields) =>{
                                        if(!error){
                                            res.json({message: "0"})
                                        }else{
                                            res.json({message: "1"})
                                        }
                                    })
                                }else{
                                    res.json({message: "1"})
                                }
                            })
                        }else{
                            res.json({message: "1"})
                        }
                    }else{
                        res.json({message: "1"})
                    }
                })
            }else{
                res.json({message: "1"})
            }
        }else{
            res.json({message: "1"})
        }
    })
}

const getHeadquarterList = async(req, res) =>{
    jwt.verify(req.token, 'secretkey', async(error) =>{
        if(!error){
            await connection.query(`select s.id_sede, s.nombre as nombre_sede, s.descripcion, cs.direccion from sedes s, ciudades_sedes cs where s.id_sede = cs.id_sede`, async(err, list, fields) =>{
                if(!err){
                    if(list.length >= 1){
                        res.json(list)
                    }else{
                        res.json({message: "1"})
                    }
                }else{
                    res.json({message: "2"})
                }
            })
        }else{
            res.json({message: "3"})
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
                        res.json({message: "1"})
                    }
                }else{
                    res.json({message: "1"})
                }
            })
        }else{
            res.json({message: "1"})
        }
    })
}

const getQuantitySpaces = async(req, res) =>{
    const {headquarter_id, rol} = req.body
    jwt.verify(req.token, 'secretkey', async(error) =>{
        if(!error){
            if(rol === "A" || rol == "a"){
                await connection.query(`SELECT s.nombre, COUNT(s.id_sede) FROM espacios es, sedes s WHERE es.id_sede = s.id_sede AND s.id_sede = ${connection.escape(headquarter_id)}`, async(error, result, fields)=>{
                    if(!error){
                        res.json(result)
                    }else{
                        res.json({message: "0"})
                    }
                })
            }else{
                res.json({message: "0"})
            }
        }else{
            res.json({message: "1"})
        }
    })
}

const getDepartments = async(req, res) =>{
    console.log(1);
    jwt.verify(req.token, 'secretkey', async(error) =>{
        if(!error){
            await connection.query(`Select * from departamentos`, async(error, result, fields) =>{
                if(!error){
                    if(result.length >= 1){
                        res.json(result)
                    }else{
                        res.json({message: "1"})
                    }
                }else{
                    res.json({message: "1"})
                }
            })
        }else{
            res.json({message: "1"})
        }
    })
}

const getCities = async(req, res) =>{
    const {department_name} = req.body
    jwt.verify(req.token, 'secretkey', async(error) =>{
        if(!error){
            await connection.query(`select * from ciudades c, departamentos d where d.id_departamento = c.id_departamento and d.nombre = ${connection.escape(department_name)}`, async(error, result, fields) =>{
                if(!error){
                    if(result.length >=1){
                        res.json(result)
                    }else{
                        res.json({message: "1"})
                    }
                }else{
                    res.json({message: "1"})
                }
            })
        }else{
            res.json({message: "1"})
        }
    })
}

module.exports ={createSchedule, modifySchedule, deleteSchedule, getSchedules, searchSchedule, createHeadquarter, modifyHeadquarter, deleteHeadquarter, getHeadquarterList, searchHeadquarter, getQuantitySpaces, getDepartments, getCities}