'use strict'

const jwt = require('jsonwebtoken');
const crypto = require("crypto");
const connection = require('../../config/connections.js');
const loginUser = require('./loginUser.js'); // import the function to be tested

jest.mock(connection, () => ({
    query: jest.fn(),
    escape: jest.fn((val) => `"${val}"`)
}));

describe('loginUser', () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {
                email: 'test@example.com',
                password: 'password'
            }
        };
        res = {
            json: jest.fn()
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return a token if email and password are correct', async () => {
        const mockResult = [{ password: crypto.createHash('sha256').update('password').digest('hex') }];
        const mockInfoUser = { id: 1, email: 'test@example.com' };
        const mockToken = 'mock-token';

        // mock the database query results
        connection.query.mockImplementation((query, callback) => {
            if (query.includes('passwords')) {
                callback(null, mockResult);
            } else {
                callback(null, [mockInfoUser]);
            }
        });

        // mock the JWT sign method
        jwt.sign = jest.fn().mockImplementationOnce((payload, secretOrPrivateKey, options, callback) => {
            callback(null, mockToken);
        });

        await loginUser(req, res);

        expect(connection.query).toHaveBeenCalledTimes(2);
        expect(jwt.sign).toHaveBeenCalledTimes(1);
        expect(res.json).toHaveBeenCalledWith({ token: mockToken });
    });

    it('should return an error message if the email is incorrect', async () => {
        const mockResult = [];
        const expectedMessage = 'Email incorrecto';

        // mock the database query results
        connection.query.mockImplementation((query, callback) => {
        callback(null, mockResult);
        });

        await loginUser(req, res);

        expect(connection.query).toHaveBeenCalledTimes(1);
        expect(res.json).toHaveBeenCalledWith({ message: expectedMessage });
    });

    it('should return an error message if the password is incorrect', async () => {
        const mockResult = [{ password: 'wrong-password' }];
        const expectedMessage = 'Contraseña incorrecta';

        // mock the database query results
        connection.query.mockImplementation((query, callback) => {
        callback(null, mockResult);
        });

        await loginUser(req, res);

        expect(connection.query).toHaveBeenCalledTimes(1);
        expect(res.json).toHaveBeenCalledWith({ message: expectedMessage });
    });
});