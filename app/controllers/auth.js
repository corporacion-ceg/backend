const { response } = require('express');
const bcrypt = require('bcrypt');
const conexion = require('../../config/conexion')


const { generarJWT } = require('../helpers/generar-jwt');



const login = async(req, res = response) => {

    const { user, pass } = req.body;
    console.log(user)
    try {
      

        conexion.query('SELECT * FROM usuarios2 WHERE user = ?', [user], async (err, results) => {

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
            console.log(results[0])
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
        const latitud = req.body.latitud;
        const longitud = req.body.longitud;
        let passHash = await bcrypt.hash(pass, 10);
        const rif = req.body.rif;
         const Tnegocio = req.body.Tnegocio;
        
     conexion.query(`SELECT * FROM usuarios2 where user = "${user}"`, (err, results) => {

            if (results[0]) {
                res.status(200).json({
                    msg: 'Ese usuario ya existe'
                  });

             } else {
                 conexion.query(`INSERT INTO usuarios2 (nombre, email , direccion , tlf , cuandrante , pass, codigo_aprobacion, user,  aprobado , tipouser , longitud , latitud, rif,tn ) VALUE  ("${name}" , "${email}", "${direccion}", "${tlf}", 1, "${passHash}", "${codigo}", "${user}", 0, 1, "${longitud}", "${latitud}", "${rif}","${Tnegocio}")`,
                (err, results) =>   {
                      if (err) {
                          console.log(err);
                          res.status(400).send(err);
                      }
       
                      conexion.query(`SELECT * FROM usuarios2 where id = ${results.insertId}`, async (err, results) => {
                          if (err) {
                              console.log(err)
                          }
                         usuario = results[0];
                      console.log(results[0])
                         // Generar el JWT
                          const token = await generarJWT(results[0].id);
         
                         res.status(200).json({
                          usuarios: usuario,
                              token
                         });
                      });
                  });
            }
       })
                  
       
    } catch (error) {
        console.log(error);
    }
   
}

const direccionLocal = async (req, res) => {
    try {
       
        const iduser = req.body.iduser;
        const direccion = req.body.direccion;
        const latitud = req.body.region.latitude;
        const longitud = req.body.region.longitude;

        if (!direccion || !latitud || !longitud) {
            res.status(500).send('Debe llenar los campos');
        } else {
            console.log(req.body)
            conexion.query(`UPDATE usuarios2 SET direccion = "${direccion}", latitud = "${latitud}", longitud = "${longitud}"  WHERE id = ${iduser}`, async (err, results) => {

                if (err) {
                    console.log(err);
                    res.status(500).send('Error al insertan usuario');
                }
                console.log(results)

                
                conexion.query(`SELECT * FROM usuarios2 where id = ${iduser}`, async (err, results) => {
                    if (err) {
                        console.log(err)
                    }
                  usuario = results[0];
                  // Generar el JWT
                  res.status(200).json({
                       msg: 'actualizacion exitosa',
                       usuarios: usuario,
                  })
                });


            })
        }


    } catch (error) {
        console.log(error)
    }
}

const queryDireccionLocal = async (req, res) => {
    try {
        const iduser = req.body.iduser;
     
                conexion.query(`SELECT * FROM usuarios2 where id = ${iduser}`, async (err, results) => {
                    if (err) {
                        console.log(err)
                    }
                  usuario = results[0];
                  // Generar el JWT
                  res.status(200).json({
                       usuarios: usuario,
                  })
                });

    } catch (error) {
        console.log(error)
    }
}

const queryDatosUser = async (req, res) => {
    try {
        const iduser = req.body.iduser;
     
                conexion.query(`SELECT * FROM usuarios2 where id = ${iduser}`, async (err, results) => {
                    if (err) {
                        console.log(err)
                    }
                  usuario = results[0];
                  // Generar el JWT
                  res.status(200).json({
                       usuarios: usuario,
                  })
                });

    } catch (error) {
        console.log(error)
    }
}

const validarTokenUsuario = async (req, res = response ) => {
    // Generar el JWT
     const token = await generarJWT( req.usuario.id );
     console.log(token)
    
    res.status(200).json({
        usuarios: req.usuario,
        token: token,
    })

}



module.exports = {
    login,
    validarTokenUsuario,
    register,
    direccionLocal,
    queryDireccionLocal,
    queryDatosUser
    
}
