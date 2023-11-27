const express = require ('express');
const app = express();
const path = require ('path');
const publicPath = path.resolve(__dirname, '../public');

//requerir archivos de rutas
const mainRoutes = require ('./routes/mainRoutes.js')

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

app.use('/register', mainRoutes);

app.use('/carrito', mainRoutes);

app.use('/product', mainRoutes);

app.use('login', mainRoutes);

