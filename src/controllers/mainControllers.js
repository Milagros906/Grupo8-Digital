const path = require('path');

module.exports = {
    index: (req, res) => {
        res.render(path.resolve(__dirname, '../views/home.ejs'));
    },
    register: (req, res) => {
        res.render(path.resolve(__dirname, '../views/register.ejs'))
    },
    carrito: (req, res) => {
        res.render(path.resolve(__dirname, '../views/carrito.ejs'))
    },
    product: (req,res) => {
        res.render(path.resolve(__dirname, '../views/product.ejs'))
    },
    login: (req,res) => {
        res.render(path.resolve(__dirname, '../views/login.ejs'))
    },
}
