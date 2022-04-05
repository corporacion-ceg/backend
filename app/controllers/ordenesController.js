const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const conexion = require('../../config/conexion');
const { promisify } = require('util');

require('dotenv').config({ path: '../../.env' })

exports.queryOrdenes = async (req, res) => { 

    const iduser = req.body.iduser
    

    conexion.query("SELECT * FROM pedidos where id_user = " + iduser, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error al consultar ordenes');
        }
        console.log(results[0])

        res.status(200).json({
            results: results[0]
        })
     } )
}