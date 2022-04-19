const express = require('express')
const app = express()
const mysqlConection = require('./conexion')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
app.post('/usuarios', (req, res) => {
    const body = req.body
    if(body.password) {
        body.password = bcrypt.hashSync(body.password, 10)}
    let consulta = 'INSERT INTO usuarios set ?';
    mysqlConection.query(consulta, body, (err, usuarioDB, fields) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            usuario: usuarioDB,
            message: "Usuario creado exitosamente!"
        })

    })
})

// insertar datos extraido de la cabecera
app.post('/datos_cabecera', (req, res) => {
    const body = req.body
    let consulta = 'INSERT INTO cabecera_datos set ?';
    mysqlConection.query(consulta, body, (err, usuarioDB, fields) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            usuario: usuarioDB,
            message: "Datos registrados exitosamente!"
        })
    })
})

// insertar lineas extraido de la cabecera
app.post('/lineas_datos_cabecera', (req, res) => {
    const body = req.body
    let consulta = 'INSERT INTO linea_cabecera_datos set ?';
    mysqlConection.query(consulta, body, (err, usuarioDB, fields) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            usuario: usuarioDB,
            message: "Datos del contenido de la tabla registrados exitosamente!"
        })
    })
})

app.get('/usuarios', (req, res) => {
    let consulta = 'SELECT * FROM usuarios';
    mysqlConection.query(consulta, (err, usuarioDB, fields) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            usuario: usuarioDB,
            message: "Usuarios recuperados!"
        })

    })
})

app.delete('/usuarios/:id', (req, res) => {
    let id = req.params.id
    let consulta = 'DELETE FROM usuarios WHERE id_usario = ?';
    mysqlConection.query(consulta, id, (err, usuarioDB, fields) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            usuario: usuarioDB,
            message: "Usuario eliminado!"
        })

    })
})
app.put('/usuarios/:id', (req, res) => {
    let id = req.params.id
    let body = req.body
    let consulta = 'UPDATE usuarios SET ? WHERE id_usario = ?';
    mysqlConection.query(consulta, [body, id], (err, usuarioDB, fields) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            usuario: usuarioDB,
            message: "Usuario editado!"
        })

    })
})
app.get('/usuarios/:id', (req, res) => {
    let id = req.params.id
    let consulta = 'SELECT * FROM usuarios where id_usario = ?';
    mysqlConection.query(consulta, id, (err, usuarioDB, fields) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            usuario: usuarioDB,
            message: "Usuarios recuperados 222!"
        })

    })
})
app.post('/login', (req, res) => {
    console.log('primero', req.body)

    if (req.body.email != undefined && req.body.password != undefined) {
        let password = req.body.password
        let email = req.body.email
        let consulta = 'select password,id_usario from usuarios where email = ?'
        mysqlConection.query(consulta, email, (err, usuarioDB, fields) => {
            // console.log('segundo',usuarioDB[0].password)
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: err
                })
            }
            if (usuarioDB.length<1){
                return res.json({
                    ok: false,
                    mensaje: 'NO existe el Correo'
                })
            }
            console.log('segundo', usuarioDB[0].password)
            if (!bcrypt.compareSync(password, usuarioDB[0].password)) {
                return res.json({
                    ok: false,
                    mensaje: 'Contraseña incorrecta'
                })
            }
            let datosUsuario = {
                id_usario: usuarioDB[0].id_usario,
                password: usuarioDB[0].password,
                rol: usuarioDB[0].rol,
                nombre: usuarioDB[0].nombre,
                email: usuarioDB[0].email
            }
            let token = jwt.sign(datosUsuario, 'todavía')
            return res.json({
                ok: true,
                mensaje: 'acceso correcto', token
            })
        })
    } else {
        return res.json({

            message: "Ingrese los datos corectos"
        })
    }
})
app.get('/usuario/:id', (req, res) => {
    let id_usuario = req.params.id
    let consulta = 'SELECT * FROM usuarios where id_usario = ?';
    mysqlConection.query(consulta, id_usuario, (err, usuarioDB, fields) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            usuario: usuarioDB,
            message: "Usuarios recuperados!"
        })

    })
})
app.put('/usuarios/:id', (req, res) => {
    const id = req.params.id
    const body = req.body
    let consulta = 'Update usuarios set ? where id_usario = ?';
    mysqlConection.query(consulta, [body, id], (err, usuarioDB, fields) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            message: "Usuario modificado"
        })

    })
})

app.post('/login', (req, res) => {
    let {
        email,
        password
    } = req.body
    let consulta = 'select email, password from usuarios where email=?'
    mysqlConection.query(consulta, email, (err, usuarioDB, fields) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                message: err
            })

        }
        if (usuarioDB.lenght < 1) {
            return res.json({
                ok: false,
                message: 'No existe el correo'
            })
        }
        if (!bcrypt.compareSync(password, usuarioDB[0].password)) {
            return res.json({
                ok: false,
                message: 'la contraseña es incorrecta'
            })
        }
        let datosUsuario = {
            id_usuario: usuarioDB[0].id_usuario,
            password: usuarioDB[0].password,
            rol: usuarioDB[0].rol,
            nombre: usuarioDB[0].nombre,
            email: usuarioDB[0].email
        }
        let token = jwt.sign(datosUsuario, 'todavía')
        res.json({
            ok: true,
            usuario: datosUsuario,
            token
        })
    })
})
module.exports = app;