const mysql = require('mysql');

const conexion = mysql.createPool({
    connectionLimit: 50,
    host: '127.0.0.1',
    user: 'tuplanet_planetadulce',
    password: 'espiderman18$$',
    database: 'tuplanet_planetadulce',
    debug: false
});
// const conexion =  mysql.createConnection({
//     host     : '127.0.0.1',
//     user     : 'tuplanet_planetadulce',
//     password : 'espiderman18$$',
//     database : 'tuplanet_planetadulce',
// });
// conexion.connect( (err) => {

//     if (err) {
//         console.log('error eugeno :'+err);
//         return err;
//     }

//     console.log('Conexion establecida');
// })

module.exports = conexion;


// const mysql = require('mysql');

// const conexion =  mysql.createConnection({
//     host: 'localhost',
//     user:'root',
//     password:'',
//     database:'planetadulce',

// });

// conexion.connect( (err) => {

//     if (err) {
//         console.log(err);
//         return err;
//     }

//     console.log('Conexion establecida');
// })

// module.exports = conexion;