
require('dotenv').config({ path: 'env/.env' });
var cookieParser = require('cookie-parser')
const db = require("./config/conexion");
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const app = express();
const bcrypt = require('bcrypt')

// var server = require('http').Server(express);
// var io = require('socket.io')(server, {
//     cors: {
//         origin: "https://central.tuplanetadulce.com",
//         methods: ["GET", "POST"],





// let onlineUsers = [];

// const addNewUser = (username, socketId) => {
//     !onlineUsers.some((user) => user.username === username) &&
//         onlineUsers.push({ username, socketId });
// };

// io.on("connection", (socket) => {
//     // io.emit("mensaje","Prueba de conexion")
//     socket.on("newUser", (username) => {

//         addNewUser(username, socket.id);
//     });
// });

const disckstorage = multer.diskStorage({
    destination: path.join(__dirname, '/imagenes/'),
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

const fileUpload = multer({
    storage: disckstorage
}).single('file')

const PORT = process.env.PORT || 9000;
const fileUpload2 = multer({
    storage: disckstorage
}).single('Imagen')

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser())
app.use(cors());



app.use(cors());
app.use(express.static(path.join(__dirname, 'dbimages/')))
app.use(express.static(path.join(__dirname, 'imgprod/')))
//API REST

app.get('/productos', (req, res) => {

    db.query(" SELECT * FROM vista_productos ", (err, data) => {
        if (err) {
            return err;
        }

        // data.map(img => {

        //     fs.writeFileSync(path.join(__dirname, '/imgprod/' + img.id + 'prod-planetadulce.png'), img.img)
        //     // data.push(...{ imagen: img.id + 'prod-planetadulce.png'});
        // })

        res.json({ productos: data });
    })

});
app.get('/productos/:id', (req, res) => {
    console.log(req.params.id);
    const ID = req.params.id;
    const sql = "SELECT * FROM vista_productos WHERE id = ?"
    db.query(sql, [ID], (err, data) => {
        if (err) {
            return err;
        }


        // io.emit("mensaje", "Prueba de conexion")
        res.json({ productos: data });
    })

})
app.delete('/productos/:id', (req, res) => {
    console.log(req.params.id);
    const ID = req.params.id;
    const sql = "DELETE FROM productos WHERE id = ?"
    db.query(sql, [ID], (err, result) => {
        if (err) {
            return err;
        }

        res.json({
            mensaje: "Eliminado con exito",
            result
        });
    })

})
app.put('/productos', fileUpload2, (req, res) => {
    const id = req.body.id
    const nombre = req.body.nombre
    const descripcion = req.body.descripcion
    const marca = req.body.Marca
    const preciob = req.body.PrecioB
    const precio = req.body.Precio
    const precio2 = req.body.Precio2
    const precio3 = req.body.Precio3
    if(req.file){

        const img = fs.readFileSync(path.join(__dirname, '/imagenes/' + req.file.filename))
        const sql = "UPDATE productos SET nombre=?,descripcion = ?,marca = ?, preciob=?,precio = ?,precio2=?,precio3=?,img=? WHERE id = ?"
        db.query(sql, [nombre, descripcion,marca, preciob, precio, precio2, precio3, img,id], (err, data) => {
        if (err) {
            console.log(err);
            return err;
        }
        res.json({
            result: 1,
            mensaje: 'Actualizado'
        });
    })
        db.query(" SELECT * FROM cargarimagenes ", (err, data) => {
        if (err) {
            return err;
        }
        data.map(img => {
            fs.writeFileSync(path.join(__dirname, '/imgprod/' + img.id + 'prod-planetadulce.png'), img.img)
        })

        console.log('ACTUALIZADO')
    })


    }else{
        const sql = "UPDATE productos SET nombre=?,descripcion = ?,marca = ?, preciob=?,precio = ?,precio2=?,precio3=? WHERE id = ?"
        db.query(sql, [nombre, descripcion, marca,preciob, precio, precio2, precio3,id], (err, data) => {
        if (err) {
            console.log(err);
            return err;
        }
        res.json({
            result: 1,
            mensaje: 'Actualizado'
        });
    })
    }
   
  





})

app.post('/productos', fileUpload2, (req, res) => {
    const nombre = req.body.nombre
    const descripcion = req.body.descripcion
    const marca = req.body.Marca
    const preciob = req.body.PrecioB
    const precio = req.body.Precio
    const precio2 = req.body.Precio2
    const precio3 = req.body.Precio3
    const img = fs.readFileSync(path.join(__dirname, '/imagenes/' + req.file.filename))
    const sql = "INSERT INTO productos(nombre,descripcion,img,preciob,precio,precio2,precio3,marca) VALUES (?,?,?,?,?,?,?,?)"
    db.query(sql, [nombre, descripcion, img, preciob, precio, precio2, precio3, marca], (err, data) => {
        if (err) {
            console.log(err);
            return err;
        }
        res.json({
            result: 1,
            mensaje: 'agregado'
        });
    })

    db.query(" SELECT * FROM cargarimagenes ", (err, data) => {
        if (err) {
            return err;
        }
        data.map(img => {
            fs.writeFileSync(path.join(__dirname, '/imgprod/' + img.id + 'prod-planetadulce.png'), img.img)
        })

        console.log('ACTUALIZADO')
    })


})


// USUARIOS
app.get('/usuarios', (req, res) => {

    db.query("SELECT * FROM usuarioslist WHERE tipouserId = 1 OR  tipouserId = 2   ", (err, data) => {
        if (err) {
             res.json(err);
            return err;
        }
        // io.emit("mensaje", "Nueva Pedido")
        console.log(data)
        res.json(data);
    })

});
app.put('/usuarios', (req, res) => {
    const values = Object.values(req.body)
    // console.log(values)
    db.query("UPDATE usuarios2 SET aprobado = ? WHERE id = ?", values, (err, data) => {
        if (err) {
            return err;
        }
        db.query('SELECT * FROM usuarios2 WHERE id = ?', values[1], async (err, results) => {
            const usuarios = results[0];
            res.status(200).json({
                usuarios
            })
            console.log(`user${usuarios.id}`,'act');
            // io.to(`user${usuarios.id}`).emit("actualizarUser", usuarios);
        })
    })
});

app.post('/usuarios', async (req, res) => {
    console.log(req.body);
    let values = Object.values(req.body)
    const tipo = req.body.tipouser

    console.log(values)
    var sql,pass,saltRounds,passHash;
    switch (tipo) {
        case 1:
             pass = req.body.rif
             saltRounds = 10;
             passHash = await bcrypt.hash(pass, saltRounds);
            values.push(passHash)
            sql = "INSERT INTO usuarios2 (nombre,email,tlf,direccion,cuandrante,rif,tipouser,user,pass) VALUES (?,?,?,?,?,?,?,?,?)";
            break;
        case 2:
             pass = req.body.pass
             saltRounds = 10;
             passHash = await bcrypt.hash(pass, saltRounds);
            values[4] = passHash
            console.log(values)
            sql = "INSERT INTO usuarios2 (nombre,tlf,email,user,pass,direccion,tipouser) VALUES (?,?,?,?,?,?,?)";
            break;
        case 3:
            sql = "INSERT INTO usuarios2 (nombre,email,tlf,tn,direccion,cuandrante) VALUES (?,?,?,?,?,?)";
            break;
        default:
            res.json({
                result: 0,
                mensaje: 'Error al agregar',
                error: 'tipo de usuario'
            });
            return 0;
            break;
    }

    db.query(sql, values, (err, data) => {
        if (err) {

            res.json({
                result: 0,
                mensaje: 'Error al agregar',
                error: err
            });

            return err;
        }
        // console.log(data)
        res.json({
            result: 1,
            mensaje: 'Agregado con Exito',
            insertId: data.insertId
        });

    })
})

app.post('/image', fileUpload, (req, res) => {
    console.log(req.body.idInsert);
    const id = req.body.idInsert
    const imagen = fs.readFileSync(path.join(__dirname, '/imagenes/' + req.file.filename))
    const sql = "UPDATE usuarios SET imagen = ? WHERE id = ? ";
    db.query(sql, [imagen, id], (err, data) => {
        if (err) {
            console.log(err);
            return err;
        }
        res.json({
            result: 1,
            mensaje: 'agregada'
        });
    })
})


app.get('/usuarios/:id', (req, res) => {
    // console.log(req.params.id);
    const ID = req.params.id;
    const sql = "SELECT * FROM usuario_detail  WHERE id = ?"
    db.query(sql, [ID], (err, data) => {
        if (err) {

            return err;
        }

        // fs.writeFileSync(path.join(__dirname, '/dbimages/'+ID+'planetadulce.png'), data[0].imagen)


        res.json({
            data
        });
    })

})

app.delete('/usuarios/:id', (req, res) => {
    console.log(req.params.id);
    const ID = req.params.id;
    const sql = "DELETE FROM usuarios WHERE id = ?"
    db.query(sql, [ID], (err, result) => {
        if (err) {
            return err;
        }

        res.json({
            mensaje: "Eliminado con exito",
            result
        });
    })

})

//DATA EXTRA
app.get('/tiponegocios/', (req, res) => {

    db.query("SELECT * FROM tiponegocios", (err, data) => {
        if (err) {
            return err;
        }

        res.json(data);
    })


});
app.get('/marcas/', (req, res) => {

    db.query("SELECT * FROM marcas", (err, data) => {
        if (err) {
            return err;
        }
        data.map(img => {

            fs.writeFileSync(path.join(__dirname, '/imgprod/' + img.id + 'marcas-planetadulce.png'), img.img)
            // data.push(...{ imagen: img.id + 'prod-planetadulce.png'});
        })
        res.json({ marcas: data });
    })


});
app.get('/marcas/:id', (req, res) => {
    console.log(req.params.id);
    const ID = req.params.id;
    const sql = "SELECT * FROM vista_productosm INNER JOIN stockalmacen ON stockalmacen.id_producto = vista_productosm.id WHERE marcaid = ?"
    db.query(sql, [ID], (err, data) => {
        if (err) {
            return err;
        }

        res.json({ productos: data });
    })

})
app.get('/cuadrantes/', (req, res) => {

    db.query("SELECT * FROM cuadrantes", (err, data) => {
        if (err) {
            return err;
        }

        res.json(data);
    })


});
app.get('/almacenes/', (req, res) => {

    db.query("SELECT * FROM almacenes", (err, data) => {
        if (err) {
            return err;
        }
        res.json(data);
    })


});
app.post('/almacenes/', (req, res) => {

    const values = Object.values(req.body)
    const sql = "INSERT INTO almacenes (nombre,descripcion) VALUES (?,?)";
    db.query(sql, values, (err, data) => {
        if (err) {

            res.json({
                result: 0,
                mensaje: 'Error al agregar',
                error: err
            });
        }

        res.json({
            result: 1,
            mensaje: 'Agregado con Exito',
            insertId: data.insertId
        });
    })


});
app.get('/almacenes/:id', (req, res) => {
    console.log(req.params.id);
    const ID = req.params.id;
    const sql = "SELECT * FROM vista_stockalmacen WHERE id_almacen = ?"
    db.query(sql, [ID], (err, data) => {
        if (err) {
            console.log(err);
            return err;
        }

        console.log(data)
        res.json({ almacen: data });
    })

})
app.post('/almacen/:id', (req, res) => {
    const ID = req.params.id;
    const sql = "SELECT * FROM vista_stockalmacen WHERE id_producto = ?"
    db.query(sql, [ID], (err, data) => {
        if (err) {
            return err;
        }
        if (data != NULL) {
            const sql = "SELECT * FROM vista_stockalmacen WHERE id_almacen = ?"
            db.query(sql, [ID], (err, data) => {
                if (err) {
                    return err;
                }


                res.json({ almacen: data });
            })
        }
    })

})

app.get('/SelectProductos/', (req, res) => {

    db.query(" SELECT id as value,nombre as label FROM vista_productos ", (err, data) => {
        if (err) {
            return err;
        }

        res.json({ data });

    })

});
app.get('/numlote/', (req, res) => {

    db.query(" SELECT id_lote + 1 as numlote FROM lotes ORDER BY id_lote DESC", (err, data) => {
        if (err) {
            res.json(err);
        }
        // console.log(data)
        if (data.length === 0) {
            res.json({ numlote: 1 });
        } else {

            res.json({ numlote: data[0]['numlote'] });
        }

    })

});
app.post('/numlote/', (req, res) => {
    const values = Object.values(req.body)
    console.log(values)
    const sql = "INSERT INTO lotes (almacen,fecha,usuario) VALUES (?,?,?)";
    db.query(sql, values, (err, data) => {
        if (err) {

            res.json({
                result: 0,
                mensaje: 'Error al agregar',
                error: err
            });
        }

        res.json({
            result: 1,
            mensaje: 'Agregado con Exito',
            insertId: data.insertId
        });

    })
})
app.post('/stock/', async (req, res) => {
    const values = Object.values(req.body)
    const id_producto = parseInt(values[0])
    const stock = parseInt(values[1])
    const id_almacen = parseInt(values[3])


    const sql = "INSERT INTO registrocargas (producto,cantidad,fecha,almacen,lote,usuario) VALUES (?,?,?,?,?,?)";
    db.query(sql, values, (err, data) => {
        if (err) {
            res.json({
                result: 0,
                mensaje: 'Error al agregar',
                error: err
            });
        }
    })


    const sql1 = "SELECT *  FROM stockalmacen WHERE id_producto =  ?  and id_almacen = ? ";
    const result = await db.query(sql1, [id_producto, id_almacen], (err, data) => {
        if (err) {
            res.json({
                result: 0,
                mensaje: 'Error al agregar',
                error: err
            });
        }
        if (data.length > 0) {
            const sql3 = "UPDATE stockalmacen SET stock = stock + ? WHERE id_producto =  ?  and id_almacen = ?  ";
            db.query(sql3, [stock, id_producto, id_almacen], (err, data) => {
                if (err) {
                    res.json({
                        result: 0,
                        mensaje: 'Error al agregar',
                        error: err
                    });
                }
                res.json({
                    result: 1,
                    mensaje: 'Agregado con Exito',
                    insertId: data.insertId
                });

            })
        } else {
            const sql4 = "INSERT INTO stockalmacen (id_producto,stock,id_almacen) VALUES (?,?,?) ";
            db.query(sql4, [id_producto, stock, id_almacen], (err, data) => {
                if (err) {
                    res.json({
                        result: 0,
                        mensaje: 'Error al agregar',
                        error: err
                    });
                }
                res.json({
                    result: 1,
                    mensaje: 'Agregado con Exito',
                    insertId: data.insertId
                });
            })
        }
    })

})

app.get('/pedidos/', (req, res) => {

    db.query(" SELECT * FROM vista_pedidos ", (err, data) => {
        if (err) {
            res.json(err);
        }
        // console.log(data)
        res.json(data);


    })

});
app.get('/detallepedidos/:id', (req, res) => {

    const ID = req.params.id;

    db.query(" SELECT * FROM vista_detalleP WHERE id_pedido = ?", [ID], (err, data) => {
        if (err) {
            res.json(err);
        }
        // console.log(data)
        res.json(data);


    })

});
app.get('/pagos/', (req, res) => {

    const ID = req.params.id;

    db.query(" SELECT * FROM vista_pedidos WHERE id_estatus != 5", [ID], (err, data) => {
        if (err) {
            res.json(err);
        }
        // console.log(data)
        res.json(data);


    })

});
app.get('/palmacen/', (req, res) => {

    const ID = req.params.id;

    db.query(" SELECT * FROM vista_pedidos WHERE id_estatus != 5 and id_estatus != 1", [ID], (err, data) => {
        if (err) {
            res.json(err);
        }
        // console.log(data)
        res.json(data);


    })

});
app.put('/pedidos', (req, res) => {

    // console.log(Object.values(req.body));
    const values = Object.values(req.body)

    const sql = "UPDATE pedidos SET estatus = ?  WHERE id_pedido = ? ";
    db.query(sql, values, (err, data) => {
        if (err) {
            res.json({
                mensaje: err
            });
        }
        res.json({
            mensaje: 'cambiado con Exito'
        });
    })


})
app.put('/pedidosA', (req, res) => {

    // console.log(Object.values(req.body));
    const values = Object.values(req.body)

    const sql = "UPDATE pedidos SET estatus = ?,id_delivery = ? WHERE id_pedido = ? ";
    db.query(sql, values, (err, data) => {
        if (err) {
            res.json({
                mensaje: err
            });
        }
        res.json({
            mensaje: 'cambiado con Exito'
        });
    })


})

app.get('/SelectDelivery', (req, res) => {


    db.query(" SELECT id as value,nombre as label FROM usuarios2 WHERE tipouser = 2", (err, data) => {
        if (err) {
            res.json(err);
        }
        // console.log(data)
        res.json({ data });


    })

});

app.get('/tipoUsuario', (req, res) => {

    db.query(" SELECT * FROM tiposusuario", (err, data) => {
        if (err) {
            res.json(err);
        }
        // console.log(data)
        res.json({ data });


    })

});
app.get('/RangoUsuario', (req, res) => {

    db.query(" SELECT * FROM rangos", (err, data) => {
        if (err) {
            res.json(err);
        }
        // console.log(data)
        res.json({ data });


    })

});
app.put('/editUsuario/:id', (req, res) => {
    // console.log(req.params.id);
    const id = req.params.id;
    const values = Object.values(req.body)
    values.push(id)
    const sql = "UPDATE usuarios2 SET nombre = ?,rif = ?,email=?,tlf=?,direccion = ? WHERE id = ?"
    console.log(values)
    db.query(sql, values, (err, data) => {
        if (err) {
            return err;
        }
        res.json({
            data
        });
    })

})
app.put('/editCUsuario/:id', (req, res) => {
    // console.log(req.params.id);
    const id = req.params.id;
    const values = Object.values(req.body)
    values.push(id)
    const sql = "UPDATE usuarios2 SET tipouser = ?,rango = ?,aprobado=? WHERE id = ?"
    console.log(values)
    db.query(sql, values, (err, data) => {
        if (err) {
            return err;
        }
        res.json({
            data
        });
    })

})
app.use('/', require('./app/routes/router'))


// io.listen(9001)
app.listen(PORT,() =>{
    console.log("ESCUCHANDO PUERTO " + PORT)
})
