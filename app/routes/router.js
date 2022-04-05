const express = require('express');
const router = express.Router();
const authController2 = require('../controllers/authController');
const authController = require('../controllers/auth');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt');
const { nuevoPedido } = require('../controllers/pedidoController');
const { queryOrdenes } = require('../controllers/ordenesController');



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

//validar token usuario
router.get('/tokenValidate',[
    validarJWT
], authController.validarTokenUsuario );



//productos

//pedidos
router.post('/nuevoPedido', [
    validarJWT
], nuevoPedido)

//ordenes
router.post('/ordenes',  [
    validarJWT
], queryOrdenes)


module.exports = router