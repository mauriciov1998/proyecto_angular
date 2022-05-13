const express = require('express');
const cors = require('cors');
const rutas = require('./rutas')
const app = express();
const path = require('path');
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors());
//RUTAS
app.use(rutas)
// const port = process.env.PORT || 3000;
// app.listen(port, '192.168.0.17', () => {
//     console.log("Servidor iniciado en el puerto:", port)
// })
app.use(express.static(path.join(__dirname,'bin')))
app.get('*',(req,res) => {
    res.sendFile(path.join(__dirname,'bin/index.html'))
})
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Servidor iniciado en el puerto:", port)
})
module.exports = app;