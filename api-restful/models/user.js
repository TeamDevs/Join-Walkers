'use strict'

const mongoose 	= require('mongoose')
const Schema	= mongoose.Schema

const UserSchema = Schema({
	nombre : String,
	apellido : String,
	email : String,
	pass : String,
	tipo : { type : String,  enum: ['cliente','coach']}
})

module.exports = mongoose.model('User', UserSchema)