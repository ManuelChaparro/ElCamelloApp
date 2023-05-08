'use strict'

const jwt = require('jsonwebtoken');
const connection = require('../../config/connections.js');

const makeBooking = async(req, res) =>{
    jwt.verify(req.token, 'secretkey', async(error)=>{
        const {space_id, client_id, date_booking, hour_start, hour_end, note} = req.body
        if(!error){
            await connection.query(`select id_reserva from reservas where id_espacio = ${connection.escape(space_id)} and fecha = ${connection.escape(date_booking)} and hora_entrada between ${connection.escape(hour_start)} and ${connection.escape(hour_end)} and hora_salida between ${connection.escape(hour_start)} and ${connection.escape(hour_end)}`, async(error, result, fields) =>{
                if(!error){
                    if(result.length === 0){
                        await connection.query(`Insert into reservas (id_espacio, id_usuario, fecha, hora_entrada, hora_salida, notas) values (${connection.escape(space_id)}, ${connection.escape(client_id)}, ${connection.escape(date_booking)}, ${connection.escape(hour_start)}, ${connection.escape(hour_end)}, ${connection.escape(note)})`,async(error, result, fields) =>{
                            if(!error){
                                res.json({message: "0"})
                            }else{
                                res.json({message: "4"})
                            }
                        })
                    }else{
                        res.json({message: "3"})
                    }
                }else{
                    res.json({message: "2"})
                }
            })
        }else{
            res.json({message: "1"})
        }
    })
}

const deleteBooking = async(req, res) =>{
    jwt.verify(req.token, 'secretkey', async(error) =>{
        const {booking_id} = req.body
        if(!error){
            await connection.query(`select id_reserva from reservas where id_reserva = ${connection.escape(booking_id)}`, async(error, result, fields) =>{
                if(!error){
                    await connection.query(`Delete from reservas where id_reserva = ${connection.escape(booking_id)}`,async(error, result, fields) =>{
                        if(!error){
                            res.json({message: "0"})
                        }else{
                            res.json({message: "2"})
                        }
                    })
                }else{
                    res.json({message: "2"})
                }
            })
        }else{
            res.json({message: "1"})
        }
    })
}

/*
const modifyBooking = async(req, res) =>{
    jwt.verify(req.token, 'secretkey', async(error) =>{
        const {space_id, client_id, date_booking, hour_start, hour_end, note} = req.body
        if(!error){
            await connection.query(`select id_reserva from reservas where id_espacio = ${connection.escape(space_id)} and fecha = ${connection.escape(date_booking)} and hora_entrada between ${connection.escape(hour_start)} and ${connection.escape(hour_end)} and hora_salida between ${connection.escape(hour_start)} and ${connection.escape(hour_end)}`, async(error, result, fields) =>{
                if(!error){
                    
                }else{
                    res.json({message: "2"})
                }
            })
        }else{
            res.json({message: "1"})
        }
    })
}
*/

module.exports = {makeBooking, deleteBooking}