'use strict'

const jwt = require('jsonwebtoken')
const connection = require('../../config/connections')

const clientQuantityPerHeadquarter = async(req, res) =>{
    jwt.verify(req.token, 'secretkey', async(error) =>{
        if(!error){
            await connection.query(`SELECT s.nombre AS sede, COUNT(su.id_sede) AS numero_clientes FROM sedes s, sedes_usuarios su WHERE s.id_Sede = su.id_sede GROUP BY s.nombre`, async(error, result, fields) =>{
                if(!error){
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

const moneyPerHeadquarter = async(req, res) =>{
    jwt.verify(req.token, 'secretkey', async(error) =>{
        if(!error){
            await connection.query(`SELECT s.nombre AS sede, SUM(f.valor_pago) AS total_acumulado FROM sedes s, facturas f, reservas r, espacios e WHERE r.id_reserva = f.id_reserva AND r.id_espacio = e.id_espacio AND e.id_sede = s.id_sede GROUP BY s.nombre`, async(error, result, fields) =>{
                if(!error){
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

const bookingPerMonth = async(req, res) =>{
    jwt.verify(req.token, 'secretkey', async(error) =>{
        if(!error){
            await connection.query(`SELECT MONTHNAME(r.fecha) AS mes, COUNT(r.id_Reserva) AS cantidad_reservas FROM reservas r GROUP BY MONTH(r.fecha)`, async(error, result, fields) =>{
                if(!error){
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

const spacesPerHeadquarter = async(req, res) =>{
    jwt.verify(req.token, 'secretkey', async(error) =>{
        if(!error){
            const {headquarter_id} = req.body
            await connection.query(`SELECT e.nombre AS espacio, COUNT(r.id_espacio) AS total_reservas FROM espacios e, reservas r, sedes s WHERE s.id_sede = e.id_sede AND e.id_espacio = r.id_espacio AND s.id_sede =${connection.escape(headquarter_id)}`, async(error, result, fields) =>{
                if(!error){
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

module.exports = {clientQuantityPerHeadquarter, moneyPerHeadquarter, bookingPerMonth, spacesPerHeadquarter}