const express = require ('express');
const app = express();
const path = require ('path');
const publicPath = path.resolve(__dirname, '../public');

//requerir archivos de rutas
const mainRoutes = require ('./routes/mainRoutes.js')
const userRoutes = require ('./routes/userRoutes.js')
const productRoutes = require ('./routes/productRoutes.js')

// Levantar el servidor
app.listen(3030, ()=>{
    console.log('Servidor corriendo en el puerto 3030');
});

// Donde están los recursos estáticos
app.use(express.static(publicPath));

//Indicando que usamos EJS
app.set('view engine', 'ejs');

//consumiendo rutas
app.use('/', mainRoutes);

//USER ROUTES

app.use('/', userRoutes)
//app.use('/register', userRoutes);

//app.use('/login', userRoutes);

//PRODUCT ROUTES

app.use('/', productRoutes)

//app.use('/carrito', productRoutes);

//app.use('/product', productRoutes);

//app.use('/caredit', productRoutes);

//app.use('/caredit2', productRoutes);