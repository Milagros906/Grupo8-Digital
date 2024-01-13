const path = require('path');
const fs = require('fs');
const bccrypt = require ('bcryptjs');
const {validationResult} = require('express-validator');

module.exports = {
    register: (req, res) => {
        res.render(path.resolve(__dirname, '../views/register.ejs'))
    },
    create: (req, res) => {
        let archivoUsuarios = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/usuarios.json')));
        const errors = validationResult(req);
        if(errors.isEmpty()){
            let usuario = {
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                dni: req.body.dni,
                email: req.body.email,
                password: bccrypt.hashSync(req.body.password, 10),
                avatar: req.file.filename,
                role: 1
            }
            archivoUsuarios.push(usuario);
            let nuevoUsuarioGuardar = JSON.stringify(archivoUsuarios,null,2);

            fs.writeFileSync(path.resolve(__dirname, '../database/usuarios.json'))

            res.redirect('/login');

        }else{
            return res.render(path.resolve(__dirname, '../views/register.ejs'),{errors: errors.errors, old:req.body})
        }
    },
    login: (req, res) => {
        res.render(path.resolve(__dirname, '../views/login.ejs'))
    }
}
