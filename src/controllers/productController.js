const path = require('path');
const fs = require('fs');
const multer = require('multer');
const upload = multer({ dest: 'public/images/productos' });


module.exports = {

    carrito: (req, res) => {
        res.render(path.resolve(__dirname, '../views/carrito.ejs'))
    },

    product: (req, res) => {
        //res.render(path.resolve(__dirname, '../views/product.ejs'))
        let productosL = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/productos.json')));
        res.render(path.resolve(__dirname, '../views/product'), { productosL });
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
    save: (req, res) => {
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
        let nuevoProductoGuardar = JSON.stringify(productosL, null, 2)
        //Guardar nuestro archivo
        fs.writeFileSync(path.resolve(__dirname, '../database/productos.json'), nuevoProductoGuardar);
        res.redirect('/product')
    },
    show: (req, res) => {
        let productosL = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/productos.json')));
        let id = req.params.id;
        let miProducto;
        productosL.forEach(producto => {
            if (producto.id == id) {
                miProducto = producto;
            }
        });
        res.render(path.resolve(__dirname, '../views/products/prodDetail.ejs'), { miProducto })
    },
    edit: (req, res) => {
        let productosL = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/productos.json')));
        let id = req.params.id;
        let productoEditar = productosL.find(producto => {
            return producto.id == id
        });
        res.render(path.resolve(__dirname, '../views/products/prodEdit.ejs'), { productoEditar });
    },
    update: [
        upload.single('avatar'), // Cambiado de 'image' a 'avatar'
        (req, res) => {
          console.log(req.body);
          let productosL = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/productos.json')));
          let id = req.params.id;
          req.body.id = id;
          req.body.id = parseInt(req.body.id);
      
          // Verificar si se cargó un archivo
          if (req.file) {
            req.body.image = '/images/productos/' + req.file.filename;
          }
      
          let productosActualizar = productosL.map(producto => {
            if (producto.id == id) {
              return req.body;
            }
            return producto;
          });
      
          let productoYaActualizado = JSON.stringify(productosActualizar, null, 2);
          fs.writeFileSync(path.resolve(__dirname, '../database/productos.json'), productoYaActualizado);
      
          res.redirect('/product');
        },
      ],
    destroy: (req, res) => {
        let productosL = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/productos.json')));
        let id = req.params.id;
        let productosFinal = productosL.filter(producto => producto.id != id)
        let productoGuardarFinal = JSON.stringify(productosFinal, null, 2);
        fs.writeFileSync(path.resolve(__dirname, '../database/productos.json'), productoGuardarFinal);
        res.redirect('/product')
    }
}

