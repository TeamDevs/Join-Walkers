'use strict'

const express = require('express')
const userCtrl = require('../controllers/user')
const api = express.Router()

api.get('/user',userCtrl.getUsers)

api.get('/user/:userId',userCtrl.getUser)

api.post('/user',userCtrl.saveUser)

api.put('/user/:userId',userCtrl.updateUser)

api.delete('/user/:userId',userCtrl.deleteUser)

module.exports = api