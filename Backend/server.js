const express = require('express');
const cors = require('cors');
const rutas = require('./rutas')
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors());

//RUTAS
app.use(rutas)


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Servidor iniciado en el puerto:", port)
})


module.exports = app;