const { response } = require('express');
const bcrypt = require('bcrypt');
const conexion = require('../../config/conexion')


const { generarJWT } = require('../helpers/generar-jwt');



const login = async(req, res = response) => {

    const { user, pass } = req.body;

    try {
      

        conexion.query('SELECT * FROM usuarios WHERE user = ?', [user], async (err, results) => {

            console.log(results.length == 0)

            if ( results.length == 0 ) {
                return res.status(400).json({
                    msg: 'Usuario / Password no son correctos - correo'
                });
            }

            // Verificar la contraseña
            const validPassword = await bcrypt.compare( pass, results[0].pass );


            if ( !validPassword ) {
                return res.status(400).json({
                    msg: 'Usuario / Password no son correctos - password'
                });
            }

            // Generar el JWT
            const token = await generarJWT( results[0].id );

            const usuarios = results[0];
    
            res.status(200).json({
                usuarios,
                token
            })
        })

       

        // SI el usuario está activo
        // if ( !usuario.estado ) {
        //     return res.status(400).json({
        //         msg: 'Usuario / Password no son correctos - estado: false'
        //     });
        // }

        


    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }   

}

const register = async (req, res) => {

    try {
        const name = req.body.name;
        const user = req.body.user;
        const pass = req.body.pass;
        const email = req.body.email;
        const tlf = req.body.tlf;
        const codigo = Math.random().toString(36).substr(2, 18);
        const direccion = req.body.direccion;
        let passHash = await bcrypt.hash(pass, 10);

        console.log(name, user, pass, passHash);

        var usuario;

        conexion.query('INSERT INTO usuarios SET ?', { nombre: name, email: email, direccion: direccion, tlf: tlf, cuandrante: 1, pass: passHash, codigo_aprobacion: codigo, user: user, aprobado: 0, tipouser: 2 },
         (err, results) =>   {
                if (err) {
                    console.log(err);
                    res.status(500).send('Error al insertan usuario');
                }

                conexion.query('SELECT * FROM usuarios where id = last_insert_id()', async (err, results) => {
                    if (err) {
                        console.log(err)
                    }
                  usuario = results[0];

                  // Generar el JWT
                   const token = await generarJWT(results[0].id);
  
                  res.status(200).json({
                    usuarios: usuario,
                       token
                  });
                });
            
             
            });
    } catch (error) {
        console.log(error);
    }





}

const validarTokenUsuario = async (req, res = response ) => {
    
  
    // Generar el JWT
     const token = await generarJWT( req.usuario.id );
    
    res.status(200).json({
        usuario: req.usuario,
        token: token,
    })

}



module.exports = {
    login,
    validarTokenUsuario,
    register
    
}
