const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const conexion = require('../../config/conexion');
const { promisify } = require('util');

require('dotenv').config({ path: '../../.env' })

exports.nuevoPedido = async (req, res) => {

    try {
        const iduser = req.body.iduser
        const monto = req.body.monto
        const fechacreacion = req.body.fechacreacion
        // const numref = req.body.numref
        // const banco  = req.body.banco

        conexion.query('INSERT INTO pedidos SET ?', { id_user: iduser, monto: monto },
            (err, results) => {
                if (err) {
                    console.log(err);
                    res.status(500).send('Error al insertan usuario');
                }

                conexion.query("SELECT MAX(id_pedido) as id FROM pedidos", (err, results) => {
                    if (err) {
                        console.log(err);
                        res.status(500).send('Error al insertan usuario');
                    }
                    console.log(results)
                    const id_pedido = results[0].id;
                    console.log('id', results)
                    const productos = req.body.productos;

                    productos.forEach(producto => {
                        const { nombre, cantidad, precio, id } = producto
                        console.log(producto.nombre)
                        conexion.query('INSERT INTO productospedido SET ?', { id_pedido, producto: nombre, cantidad, id_producto: id },
                            (err, results) => {
                                if (err) return res.status(500).send('Error al insertan usuario');

                                conexion.query(`UPDATE stockalmacen SET stock = (stock - ${cantidad}) WHERE id_producto = ${id} `, (err, result) => {
                                    if (err) return res.status(500).send('Error al insertan usuario');
                                })


                            })
                    });
                });

                res.status(200).json({
                    msg: 'Pedido creado con exito',
                    id_pedido: results.insertId
                })

            });
        console.log(req.body);

    } catch (error) {
        res.status(500).send('Error al insertan usuario');
    }
}

exports.actStatusPedido = async (req, res) => {

    try {
        const id_pedido = req.body.id_pedido


        conexion.query(`UPDATE pedidos SET estatus = 3 WHERE  id_pedido =${id_pedido}`,
            (err, results) => {
                if (err) {
                    console.log(err);
                    res.status(500).send('Error al insertan usuario');
                }

                res.status(200).json({
                    msg: 'Entrega Finalizada'
                });
            });
        console.log(req.body);
    } catch (error) {
        res.status(500).send('Error al insertan usuario');
    }
}

exports.queryStatus = async (req, res) => {
    try {
        const id_user = req.params.id_user

        conexion.query(`SELECT * from pedidos WHERE id_user = ${id_user} ORDER BY id_pedido DESC LIMIT 1 `, (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send('Error consultado orden pedido');
            }

            res.status(200).json({
                msg: data[0]
            });
        })
    } catch (error) {
        console.log(err);
        res.status(500).send('Error consultado orden pedido');
    }
}

exports.actPedido = async (req, res) => {
    try {
        const banco = req.body.banco
        const numref = req.body.numref
        const id_pedido = req.body.id_pedido

        conexion.query( `UPDATE pedidos SET num_ref = "${numref}", banco = "${banco}", estatus = 2 WHERE id_pedido = ${id_pedido}`, (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send('Error actualizando orden pedido');
            }

            res.status(200).json({
                msg: data
            });
        })
    } catch (error) {
        console.log(err);
        res.status(500).send('Error actualizando orden pedido');
    }
}