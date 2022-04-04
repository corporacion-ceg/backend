const { response, request } = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../../.env' })
const conexion = require('../../config/conexion')


const validarJWT = async (req = request, res = response, next) => {

    const token = req.header('x-token'); 

    console.log(process.env.JWT_KEY)

    console.log(token);

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {
       
        const {uid} = jwt.verify(token, process.env.JWT_KEY);

        console.log(uid)

        // leer el usuario que corresponde al uid
        var usuario;
        // const sql = "SELECT * FROM usuarios WHERE id = ?" + uid
        // db.query(sql, [ID], (err, data) => {
        //     if (err) {
        //         return err;
        //     }

        //     usuario = data;
        // })

        await conexion.query('SELECT * FROM usuarios where id = ' + uid, async (err, results) => {
            if (err) {
                res.status(401).json({
                    msg: 'Token no válido'
                })
                console.log(err)
            }
          usuario = results[0];

          console.log(usuario)

          req.usuario = usuario;
         
        next();
        });

        // if (!usuario) {
        //     return res.status(401).json({
        //         msg: 'Token no válido - usuario no existe DB'
        //     })
        // }

        // Verificar si el uid tiene estado true
        // if (!usuario.estado) {
        //     return res.status(401).json({
        //         msg: 'Token no válido - usuario con estado: false'
        //     })
        // }


        

    } catch (error) {
        res.status(401).json({
            msg: 'Token no válido'
        })
    }

}




module.exports = {
    validarJWT
}