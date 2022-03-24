const express = require('express');
const router = express.Router();
const authController2 = require('../controllers/authController');
const authController = require('../controllers/auth');
const { check } = require('express-validator');



//usuarios
router.post('/register', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('user', 'El usuario es obligatorio').not().isEmpty(),
    check('pass', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
    check('email', 'El correo no es válido').isEmail(),
    check('tlf', 'El usuario es obligatorio').not().isEmpty(),
    check('direccion', 'El usuario es obligatorio').not().isEmpty(),
] , authController.register);
router.post('/login', authController.login);


//productos


module.exports = router