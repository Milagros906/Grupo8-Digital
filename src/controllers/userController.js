const path = require('path');
const fs = require('fs');
const bccrypt = require ('bcryptjs');
const {validationResult} = require('express-validator');
const multer = require('multer');
const upload = multer({ dest: 'public/images' });

module.exports = {
    register: (req, res) => {
        res.render(path.resolve(__dirname, '../views/register.ejs'))
    },
    create: (req, res) => {
        let archivoUsuarios = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/usuarios.json')));
        const errors = validationResult(req);
        if(errors.isEmpty()){
            let usuarioNew = {
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                dni: req.body.dni,
                email: req.body.email,
                password: bccrypt.hashSync(req.body.password, 10),
                avatar: req.file.filename,
                role: 1
            }
            archivoUsuarios.push(usuarioNew);
            const nuevoUsuarioGuardar = JSON.stringify(archivoUsuarios, null, 2);

            fs.writeFileSync(path.resolve(__dirname, '../database/usuarios.json'), nuevoUsuarioGuardar)
            res.redirect('/login');

        }else{
            // Imprimir errores en la consola para ver si hay algún problema con la validación
            console.log(errors.array());
            return res.render(path.resolve(__dirname, '../views/register.ejs'),{errors: errors.errors, old:req.body})
        }
    },
    login: (req, res) => {
        res.render(path.resolve(__dirname, '../views/login.ejs'))
    },
    ingresar: (req,res) => {
        let archivoUsuarios = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/usuarios.json')));
        let usuarioLogin = archivoUsuarios.find( user => user.email.toUpperCase() == req.body.email.toUpperCase());

        if(usuarioLogin) {
            const match = bcrypt.copareSync(req.body.password, usuarioLogin.password)
            if(match){
                res.redirect('/home')
            }
        }
        return res.render(path.resolve(__dirname, '..views/login.ejs'), {
            errors: {
                msg: 'Tu correo y/o tu contraseña son incorrectos.'
            }
        })
    }
}
