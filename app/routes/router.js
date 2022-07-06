const express = require('express');
const router = express.Router();
const authController2 = require('../controllers/authController');
const authController = require('../controllers/auth');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt');
const { nuevoPedido, actStatusPedido, queryStatus, actPedido, reIngresoProductos, productosPedidoPendiente } = require('../controllers/pedidoController');
const { queryOrdenes, queryOrdenesDelivery } = require('../controllers/ordenesController');
const { queryDetalleOrden} = require('../controllers/ordenesController')


//usuarios
router.post('/register', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('user', 'El usuario es obligatorio').not().isEmpty(),
    check('pass', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
    check('email', 'El correo no es válido').isEmail(),
    check('tlf', 'El usuario es obligatorio').not().isEmpty(),
    check('direccion', 'El usuario es obligatorio').not().isEmpty(),
    check('Tnegocio', 'El usuario es obligatorio').not().isEmpty(),
] , authController.register);
router.post('/login', authController.login);

router.post('/direccionLocal' ,  authController.direccionLocal )


router.post('/datosUser' ,  authController.queryDatosUser )

//validar token usuario
router.get('/tokenValidate',[
    validarJWT
], authController.validarTokenUsuario );

router.post('/direccionCliente',  [
    validarJWT
], authController.queryDireccionLocal)



//productos

//pedidos
router.post('/nuevoPedido', [
    validarJWT
], nuevoPedido)

router.post('/actStatusPedido', [
    validarJWT
], actStatusPedido)


router.get('/queryPedido/:id_user', [
    validarJWT
], queryStatus)

router.put('/actPedido', [
    validarJWT
], actPedido)

router.put('/reIngresoProduc', [
    validarJWT
], reIngresoProductos)

router.get('/productoPedidoPendiente/:id_pedido',[
    validarJWT
],productosPedidoPendiente)

//ordenes
router.post('/ordenes',  [
    validarJWT
], queryOrdenes)

router.post('/ordenesDelivery',  [
    validarJWT
], queryOrdenesDelivery)

router.post('/detalleOrden', [
    validarJWT
], queryDetalleOrden)

module.exports = router