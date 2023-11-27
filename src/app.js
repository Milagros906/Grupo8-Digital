const express = require ('express');
const app = express();

const path = require ('path');

const publicPath = path.resolve(__dirname, '../public');

// Levantar el servidor
app.listen(3030, ()=>{
    console.log('Servidor corriendo en el puerto 3030');
});

// Donde están los recursos estáticos
app.use(express.static(publicPath));

//EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Creando nuestras rutas
app.get("/", function (req, res) {
    res.render('home');
});

app.get('/register', function(req,res){
    res.render('register');
})

app.get("/carrito", function (req, res) {
    res.render('carrito');
})

app.get("/product", function (req, res) {
    res.render('product');
})

app.get("/login", function (req, res) {
    res.render('login');
})
