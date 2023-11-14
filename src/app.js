const express = require('express');
const app = express();

const path = require('path');

const publicPath = path.resolve(__dirname, '../public');

// Levantar el servidor
app.listen(3030, () => {
    console.log('Servidor corriendo en el puerto 3030');
});

// Donde están los recursos estáticos
app.use(express.static('public'));

// Creando nuestras rutas
app.get("/", function (req, res) {
    res.sendFile(path.resolve(__dirname, "./views/home.html"));
})

app.get('/register', function (req, res) {
    res.sendFile(path.join(__dirname, '/views/register.html'));
})

app.get("/register", function (req, res) {
    res.sendFile(path.resolve(__dirname, "./views/register.html"));
})

app.get("/carrito", function (req, res) {
    res.sendFile(path.resolve(__dirname, "./views/carrito.html"));
})

app.get("/product", function (req, res) {
    res.sendFile(path.resolve(__dirname, "./views/product.html"));
})

app.get("/login", function (req, res) {
    res.sendFile(path.resolve(__dirname, "./views/login.html"));
})
