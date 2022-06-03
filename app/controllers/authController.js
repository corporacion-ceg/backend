const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const conexion = require('../../config/conexion');
const { promisify } = require('util');

require('dotenv').config({ path: '../../.env' })


const saltRounds = 10;

exports.register = async (req, res) => {

    try {
        const name = req.body.name;
        const user = req.body.user;
        const pass = req.body.pass;
        const email = req.body.email;
        const tlf = req.body.tlf;
        const codigo = Math.random().toString(36).substr(2, 18);
        const direccion = req.body.direccion;
        let passHash = await bcrypt.hash(pass, saltRounds);

        console.log(name, user, pass, passHash);

        conexion.query('INSERT INTO usuarios SET ?', { nombre: name, email: email, direccion: direccion, tlf: tlf, cuandrante: 1, pass: passHash, codigo_aprobacion: codigo, user: user },
            (err, results) => {
                if (err) {
                    console.log(err);
                    res.status(500).send('Error al insertan usuario');
                }

                conexion.query('SELECT * FROM usuarios where id = last_insert_id()', (err, results) => {
                    if (err) {
                        console.log(err)
                    }
                    console.log(results)
                });

                console.log(results);
              
             
            });
    } catch (error) {
        console.log(error);
    }





}

exports.login = async (req, res) => {
    try {
        const user = req.body.user;
        const pass = req.body.pass;

        if (!user || !pass) {
            res.status(500).send('Debe llenar los campos');
        } else {

            conexion.query('SELECT * FROM usuarios WHERE user = ?', [user], async (err, results) => {

                if (results.lengt == 0 || !(await bcrypt.compare(pass, results[0].pass))) {
                    res.status(500).send('Los datos ingresados son invalidos');
                } else {

                    const id = results[0].id;

                    const token = jwt.sign({ id }, process.env.JWT_KEY, {
                        expiresIn: process.env.JWT_TIEMPO_EXPIRA
                    })

                    console.log(token);

                    const cookiesOptions = {
                        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                        httpOnly: true
                    }

                    res.cookie('jwt', token, cookiesOptions)

                    res.status(200).send('Login Exitoso')


                }

            })
        }


    } catch (error) {
        console.log(error)
    }
}

exports.isAuthenticated = async (req, res, next) => {
    if (req.cookies.jwt) {
        try {
            const decodificada = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_KEY);
            conexion.query('SELECT * FROM usuarios WHERE id = ?', [decodificada.id], (errer, results) => {
                req.users = results[0];
                next()
            })
        } catch (error) {
            console.log(error);
        }
    } else {
        next()
    }

}



exports.logout = (req, res) => {
    res.clearCookie('jwt');
}


