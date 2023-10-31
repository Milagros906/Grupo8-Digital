const express = require ('express');
const app = express();

const path = require ('path');

const publicPath = path.resolve(__dirname, '../public');

app.listen(3030, ()=>{
    console.log('Servidor corriendo en el puerto 3030');
});

app.use(express.static('public'));

app.get("/", function (req, res) {
    res.sendFile(path.resolve(__dirname, "./views/home.html"));
})

