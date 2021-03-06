const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const conexion = require('../../config/conexion');
const { promisify } = require('util');

require('dotenv').config({ path: '../../.env' })

exports.queryOrdenes = async (req, res) => {

    const iduser = req.body.iduser


    conexion.query(`SELECT * FROM pedidos left join estatus on estatus.id_estatus = pedidos.estatus where id_user = ${iduser}`, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error al consultar ordenes');
        }
        console.log(results[0])

        res.status(200).json({
            results: results
        })
    })
}

exports.queryOrdenesDelivery = async (req, res) => {
    const iduser = req.body.iduser
    conexion.query("SELECT * FROM pedidos where estatus = 2 and id_delivery = " + iduser, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error al consultar ordenes');
        }
        console.log(results[0])

        res.status(200).json({
            results: results
        })
    })
}

exports.queryDetalleOrden = async (req, res) => {

    const id_pedido = req.body.id_pedido
    conexion.query("SELECT* FROM Vista_detallePM where id_pedido = " + id_pedido, (err, results) => {

        if (err) {
            console.log(err);
            res.status(500).send('Error al consultar ordenes');
        }
        console.log(results[0])

        res.status(200).json({
            results: results
        })
    })

}