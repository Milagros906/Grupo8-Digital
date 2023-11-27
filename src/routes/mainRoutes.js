const express = require ('express');
const routes = express.Router();
const path = require('path');

//importar el controlador
const mainControllers = require('../controllers/mainControllers');

//Armando rutas
routes.get('/', mainControllers.index);
routes.get('/register', mainControllers.register);
routes.get('/carrito', mainControllers.carrito);
routes.get('/product', mainControllers.product);
routes.get('/login', mainControllers.login);


module.exports = routes;

