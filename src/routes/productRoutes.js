const express = require ('express');
const productRoutes = express.Router();
const path = require('path');

//importar el controlador
const productController = require('../controllers/productController');

productRoutes.get('/carrito', productController.carrito);
productRoutes.get('/product', productController.product);
productRoutes.get('/caredit', productController.caredit);
productRoutes.get('/caredit2', productController.caredit2);

module.exports = productRoutes;