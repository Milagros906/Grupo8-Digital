const express = require ('express');
const userRoutes = express.Router();
const fs = require ('fs');
const path = require('path');
const { body } = require('express-validator');
const multer = require('multer');
const bcrypt = require('bcryptjs');

let archivoUsuarios = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/usuarios.json')));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, '../../public/images'));
    },
    filename: function (req, file, cb) {
        let fileName = `${Date.now()}_img${path.extname(file.originalname)}`;
        //console.log(fileName);
        cb(null, fileName);
    }
});

const upload = multer({storage});


const validaciones = [
    body('nombre').isLength({min:3}).withMessage('Debes completar el campo de Nombre'),
    body('apellido').isLength({min:3}).withMessage('Debes completar el campo de Apellido'),
    body('dni').notEmpty().withMessage('Debes completar el campo DNI'),
    body('email').isEmail().withMessage('Debes completar el campo con tu E-mail'),
    body('avatar').notEmpty().withMessage('Debes completar el campo con tu avatar'),
    body('password').isLength({min:6}).withMessage('Este campo debe contener como minimo 6 caracteres'),
    body('repeatPassword').isLength({min:6}).withMessage('Este campo debe contener como minimo 6 caracteres'),
    body('repeatPassword').custom((value, {req}) =>{
        if(req.body.password == value){
            return true;
        }else{
            return false;
        }
    }).withMessage('Las contraseñas deben ser iguales'),
    body('avatar').custom((value, {req})=>{
        if(req.file != undefined){
            return true;
        }else{
            return false;
        }
    }).withMessage('Debe elegir una imagen para su perfil')
];

//importar el controlador
const userController = require('../controllers/userController');

userRoutes.get('/register', userController.register);
userRoutes.post('/register', upload.single('avatar'), validaciones, userController.create)
userRoutes.get('/login', userController.login);

module.exports = userRoutes;