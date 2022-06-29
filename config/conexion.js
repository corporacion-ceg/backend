


const mysql = require('mysql');

const conexion =  mysql.createConnection({
    host: 'localhost',
    user:'root',
    password:'',
    database:'tuplanet_planetadulce',

});

conexion.connect( (err) => {

    if (err) {
        console.log(err);
        return err;
    }

    console.log('Conexion establecida');
})

module.exports = conexion;