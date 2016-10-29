'use strict'

const User = require('../models/user')

function getUser(req,res) {

	let userId =  req.params.userId 

	User.findById(userId,(err, user)=>{
		if(err) return res.status(500).send({ message : `Error al realizar la peticion ${err}`})
		if(!user) return res.status(404).send({ message: `El Usuario no existe`})
		res.status(200).send({ user : user})
	})
}

function getUsers(req,res) {

	User.find({}, (err, users)=>{
		if(err) return res.status(500).send({ message : `Error al realizar la peticion ${err}`})
		if(!users) return res.status(404).send({ message: 'No existen usuarios'})
		res.send(200, { users })
	})
}

function saveUser(req, res) {
	console.log('POST /api/user')
	console.log(req.body)
	let user = new User()
	user.nombre = req.body.nombre
	user.apellido = req.body.apellido
	user.email = req.body.email
	user.pass = req.body.pass
	user.tipo = req.body.tipo

	user.save((err, userStored)=>{
		if(err) res.status(500).send({ message: `Error al salvar la base de datos ${err}`})

		res.status(200).send({ user : userStored})
	})
}

function updateUser(req, res) {
	let userId = req.params.userId
	let update = req.body

	User.findByIdAndUpdate(userId, update, (err, userUpdate)=>{
		if (err) res.status(500).send({ message : `Erro al actualizar el usuario ${err}`})
		res.status(200).send({ user : userUpdate })
	})
}

function deleteUser(req, res) {
	let userId = req.params.userId
	User.findById(userId, (err,user) =>{
		if (err) res.status(500).send({ message : `Erro al borrar el usuario ${err}`})

		user.remove(err =>{
			if (err) res.status(500).send({ message : `Erro al borrar el usuario ${err}`})
			res.status(200).send({ message: 'El Usuario a sido eliminado' })
		})
	})
}

module.exports = {
	getUser,
	getUsers,
	saveUser,
	updateUser,
	deleteUser
}