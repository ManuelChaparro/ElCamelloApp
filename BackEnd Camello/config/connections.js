require('dotenv').config();
const mysql = require('mysql');

const config = {
    host: process.env.HOST_DB,
    user: process.env.USER_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.DATABASE
}
const dbconector = mysql.createConnection(config);

dbconector.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + dbconector.threadId);
});

module.exports = dbconector;