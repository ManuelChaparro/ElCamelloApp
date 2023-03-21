'use strict'

const request = require('supertest');
const app = require('../app');
const connection = require('../../config/connections');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

describe('Prueba de login', () => {
    // Antes de cada prueba, crea un usuario en la base de datos
    beforeEach(async done => {
        const email = 'test@example.com';
        const password = 'password123';
        const email_binary = crypto.createHash('sha256').update(email).digest('hex');
        const password_binary = crypto.createHash('sha256').update(password).digest('hex');
        const query = `INSERT INTO usuarios (email) VALUES (${connection.escape(email)}); INSERT INTO passwords (indicador, password) VALUES (${connection.escape(email_binary)}, ${connection.escape(password_binary)})`;
        await connection.query(query, (err, results) => {
            if (err) throw err;
            done();
        });
    });

    // Despues de cada prueba, elimina el usuario que creó
    afterEach(async done => {
        const email = 'test@example.com';
        const email_binary = crypto.createHash('sha256').update(email).digest('hex');
        const query = `DELETE FROM usuarios WHERE email = ${connection.escape(email)}; DELETE FROM passwords WHERE indicador = ${connection.escape(email_binary)}`;
        await connection.query(query, (err, results) => {
            if (err) throw err;
            done();
        });
    });

    //Probando un inicio de sesión exitoso
    test('POST /login - success', async () => {
        const email = 'test@example.com';
        const password = 'password123';
        const response = await request(app).post('/login').send({email, password}).expect(200);
        expect(response.body.token).toBeDefined();
    });

    // Probando una contraseña incorrecta
    test('POST /login - incorrect password', async () => {
        const email = 'test@example.com';
        const password = 'wrongpassword';
        const response = await request(app).post('/login').send({email, password}).expect(200);
        expect(response.body.message).toBe('Contraseña incorrecta');
    });

    // Probando un correo incorrecto
    test('POST /login - incorrect email', async () => {
        const email = 'wrongemail@example.com';
        const password = 'password123';
        const response = await request(app).post('/login').send({email, password}).expect(200);
        expect(response.body.message).toBe('Email incorrecto');
    });
});

describe('loginUser', () => {
    test('Debe devolver un token cuando el correo electrónico y la contraseña son correctos', async () => {
        const req = { body: { email: 'test@example.com', password: 'password' } };
        const res = {
            json: jest.fn().mockImplementation((response) => response),
        };
        await loginUser(req, res);
        expect(res.json).toHaveBeenCalled();
        expect(res.json.mock.calls[0][0].token).toBeDefined();
    });
});