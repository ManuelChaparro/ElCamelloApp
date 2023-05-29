require('dotenv').config();
const mysql = require('mysql')

const config = {
    host: process.env.HOST_DB,
    user: process.env.USER_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.DATABASE
}
const dbconector = mysql.createConnection(config);
dbconector.escape = mysql.escape;

dbconector.connect((err) =>{
    if (err) {
        console.error('Error conectando la base de datos con el servidor: ' + err.stack);
        return;
    }
    console.log('Se ha conectado exitosamente la base de datos con el servidor, id:' + dbconector.threadId);
});

module.exports = dbconector;