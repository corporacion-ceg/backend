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
        const numref = req.body.numref


        conexion.query('INSERT INTO pedidos SET ?', { id_user: iduser, monto: monto, num_ref: numref },
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
                    console.log('id',results)
                    const productos = req.body.productos;

                    productos.forEach(producto => {
                        const {nombre, cantidad, precio, id} = producto
                        console.log(producto.nombre)
                        conexion.query('INSERT INTO productospedido SET ?', { id_pedido, producto: nombre, cantidad, id_producto : id },
                            (err, results) => { 
                                if (err) return  res.status(500).send('Error al insertan usuario');
                                console.log('insertado')
                            })
                        });
                        res.status(200).json({
                            msg: 'Pedido creado con exito'
                        });
                });

            });
        console.log(req.body);

    } catch (error) {
        res.status(500).send('Error al insertan usuario');
    }
}