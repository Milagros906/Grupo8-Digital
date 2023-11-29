const express = require ('express');
const userRoutes = express.Router();
const path = require('path');

//importar el controlador
const userController = require('../controllers/userController');

userRoutes.get('/register', userController.register);
userRoutes.get('/login', userController.login);

module.exports = userRoutes;