'use strict'
// Importamos las dependencias necesarias
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const connection = require('../../config/connections'); // Suponiendo que tienes un archivo de conexión a la base de datos

// Importamos la función deleteUser
const { deleteUser } = require('../controllers/users.controller');

// Creamos un mock de req y res para la prueba
const req = {
    body: {
        email: 'example@example.com',
        password: 'password'
    },
    token: jwt.sign({ username: 'example' }, 'secretkey')
};

const res = {
    json: jest.fn()
};

// Escribimos la prueba unitaria
describe('deleteUser', () => {
    it('debería eliminar el usuario correctamente', () => {
        // Creamos un mock de la función connection.query para simular la consulta a la base de datos
        connection.query = jest.fn().mockImplementation(async(query, callback) => {
            callback(null, [{ password: crypto.createHash('sha256').update('password').digest('hex') }]);
        });

        deleteUser(req, res);

        expect(res.json).toHaveBeenCalledWith({ message: 'Usuario eliminado correctamente' });
    });

    it('debería mostrar un mensaje de email incorrecto', async () => {
        // Creamos un mock de la función connection.query para simular la consulta a la base de datos
        connection.query = jest.fn().mockImplementation((query, callback) => {
            callback(null, []);
        });

        await deleteUser(req, res);

        expect(res.json).toHaveBeenCalledWith({ message: 'Email incorrecto' });
    });

    it('debería mostrar un mensaje de contraseña incorrecta', async () => {
        // Creamos un mock de la función connection.query para simular la consulta a la base de datos
        connection.query = jest.fn().mockImplementation((query, callback) => {
            callback(null, [{ password: 'wrongpassword' }]);
        });

        await deleteUser(req, res);

        expect(res.json).toHaveBeenCalledWith({ message: 'Contraseña incorrecta' });
    });

    it('debería mostrar un mensaje de no autorizado', async () => {
        // Creamos un mock de la función jwt.verify para simular un error en la autenticación
        jwt.verify = jest.fn().mockImplementation((token, secret, callback) => {
            callback('error');
        });

        await deleteUser(req, res);

        expect(res.json).toHaveBeenCalledWith({ message: 'No tiene autorización para ingresar' });
    });
});