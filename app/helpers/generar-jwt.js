const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'env/.env' });


const generarJWT = ( uid = '' ) => {

    console.log(process.env.JWT_KEY)

    return new Promise( (resolve, reject) => {

        const payload = { uid };

        jwt.sign( payload, process.env.JWT_KEY, {
            expiresIn: '1d'
        }, ( err, token ) => {

            if ( err ) {
                console.log(err);
                reject( 'No se pudo generar el token' )
            } else {
                resolve( token );
            }
        })

    })
}




module.exports = {
    generarJWT
}

