
'use strict'

const express 		= require('express')
const bodyParser	= require('body-parser')
const app			= express()
const mongoose		= require('mongoose')

const config = require('./config/config')

const api = require('./routes/index')

app.use(bodyParser.urlencoded({ extended: false}))

app.use(bodyParser.json())

app.use('/api', api)

mongoose.connect(config.db,(err, res)=>{
	if(err) {
		return console.log(`Error al conectar a la base de datos: ${err}`)
	}
	console.log('Conexion a la base de datos establecida')

	app.listen(config.port, ()=>{
		console.log(`API REST corriendo en http://localhost:${config.port}`)
	})
})
