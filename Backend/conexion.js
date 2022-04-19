
const mysql = require('mysql')
const mysqlConection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'dbproyecto',
    port: '3306'
})
mysqlConection.connect((err) => {
    if (err) {
        console.log('Error conexion con la Base de Datos:', err);
        return;
    }
    console.log('Conexion a la Base de Datos exitosa!')
})

module.exports = mysqlConection