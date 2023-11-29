const path = require('path');

module.exports = {
    
    carrito: (req, res) => {
        res.render(path.resolve(__dirname, '../views/carrito.ejs'))
    },
    
    product: (req, res) => {
        res.render(path.resolve(__dirname, '../views/product.ejs'))
    },

    caredit: (req, res) => {
        res.render(path.resolve(__dirname, '../views/caredit.ejs'))
    },

    caredit2: (req, res) => {
        res.render(path.resolve(__dirname, '../views/caredit2.ejs'))
    },
}