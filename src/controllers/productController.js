const path = require('path');
const fs = require('fs');

module.exports = {
    
    carrito: (req, res) => {
        res.render(path.resolve(__dirname, '../views/carrito.ejs'))
    },
    
    product: (req, res) => {
        //res.render(path.resolve(__dirname, '../views/product.ejs'))
        let productosL = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/productos.json')));
        res.render(path.resolve(__dirname, '../views/product'), {productosL});
    },

    caredit: (req, res) => {
        res.render(path.resolve(__dirname, '../views/caredit.ejs'))
    },

    caredit2: (req, res) => {
        res.render(path.resolve(__dirname, '../views/caredit2.ejs'))
    },
    //create: (req,res) => {
    //    res.render(path.resolve(__dirname, '../views/caredit.ejs'));
    //},
    save: (req,res) => {
        //Recibir datos del Front-end al Backend: Formulario (req.body)
        //Query strings: req.query
        //Cuando vienen de una etiqueta <a> Ancla req.params
        //console.log(req.body);
        let productosL = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/productos.json')));
        let ultimoElemento = productosL.pop();
        productosL.push(ultimoElemento);
        let nuevoProducto = {
            id: ultimoElemento.id + 1,
            nombreproducto: req.body.nombreproducto,
            marca: req.body.marca,
            descripcion: req.body.descripcion,
            precio: req.body.precio,
            tipoDeProducto: req.body.tipoDeProducto,
            avatar: req.file.filename
        }
        //console.log(nuevoProducto)
        //Agregamos nuestro nuevo producto al array
        productosL.push(nuevoProducto);
        //Convertir nuestro array a un archivo en formato json
        let nuevoProductoGuardar = JSON.stringify(productosL,null,2)
        //Guardar nuestro archivo
        fs.writeFileSync(path.resolve(__dirname,'../database/productos.json'),nuevoProductoGuardar);
        res.redirect('/product')
    },
    show: (req,res) => {
        //console.log(req.params);
        let productosL = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/productos.json')));
        let id = req.params.id;
        let miProducto;
        productosL.forEach(producto => {
            if(producto.id == id){
                miProducto = producto;
            }
        });
        res.render(path.resolve(__dirname, '../views/products/prodDetail.ejs'),{miProducto})
    }
}