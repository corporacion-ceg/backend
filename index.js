const express = require('express');
const cors =  require('cors');
const db = require("./config/conexion");
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();

const disckstorage = multer.diskStorage({
    destination: path.join(__dirname, '/imagenes/'),
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }})

const fileUpload = multer({
    storage: disckstorage
}).single('file')

const fileUpload2 = multer({
    storage: disckstorage
}).single('Imagen')

app.use(express.urlencoded({ extended:false }));
app.use(express.json());

const PORT = process.env.PORT || 9000;

app.use(cors());
app.use(express.static(path.join(__dirname, 'dbimages/')))
app.use(express.static(path.join(__dirname, 'imgprod/')))
//API REST

app.get('/productos',(req,res) => {

    db.query(" SELECT * FROM vista_productos ",(err,data)=>{
        if (err) {
            return err;
        }

        // data.map(img => {
           
        //     fs.writeFileSync(path.join(__dirname, '/imgprod/' + img.id + 'prod-planetadulce.png'), img.img)
        //     // data.push(...{ imagen: img.id + 'prod-planetadulce.png'});
        // })
        console.log(data)
        res.json({productos: data,});
    })

});
app.get('/productos/:id', (req, res) => {
    console.log(req.params.id);
    const ID = req.params.id;
    const sql = "SELECT * FROM vista_productos WHERE id = ?"
    db.query(sql,[ID], (err, data) => {
        if (err) {
            return err;
        }


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
app.put('/productos',(req,res)=>{
    console.log(Object.values(req.body));
    const values = Object.values(req.body)
    const sql = "UPDATE productos SET nombre = ?,precio = ?,marca = ? WHERE id = ? ";
    db.query(sql, values, (err, data) => {
        if (err) {
            res.json({
                mensaje: err
            });
        }
      
        res.json({
            mensaje:'Agregado con Exito'
        });
    })
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
    db.query(sql, [nombre, descripcion, img,preciob,precio,precio2,precio3,marca], (err, data) => {
        if (err) {
            console.log(err);
            return err;
        }
        res.json({
            result: 1,
            mensaje: 'agregado'
        });
    })
})


// USUARIOS
app.get('/usuarios', (req, res) => {

    db.query("SELECT * FROM usuarios", (err, data) => {
        if (err) {
            return err;
        }

        res.json( data );
    })

});


app.post('/usuarios', (req, res) => {
    console.log(Object.values(req.body));
    const values = Object.values(req.body)
    const sql = "INSERT INTO usuarios (nombre,email,tlf,tn,direccion,cuandrante) VALUES (?,?,?,?,?,?)";
    db.query(sql, values, (err, data) => {
        if (err) {

            res.json({
                result: 0,
                mensaje: 'Error al agregar',
                error:err
            });
        }

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
    const imagen =  fs.readFileSync(path.join(__dirname, '/imagenes/'+req.file.filename))
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
    const sql = "SELECT * FROM usuarios WHERE id = ?"
    db.query(sql, [ID], (err, data) => {
        if (err) {
           
            return err;
        }

        fs.writeFileSync(path.join(__dirname, '/dbimages/'+ID+'planetadulce.png'), data[0].imagen)
        

       res.json({
           data,
           imagen:ID+'planetadulce.png' 
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
        res.json({marcas:data});
    })


});
app.get('/marcas/:id', (req, res) => {
    console.log(req.params.id);
    const ID = req.params.id;
    const sql = "SELECT * FROM vista_productosm WHERE marcaid = ?"
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
            return err;
        }


        res.json({ almacen: data });
    })

})
app.post('/almacen/:id', (req, res) => {
    console.log(req.params.id);
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

app.listen(PORT,()=>{
    console.log('listening on port '+PORT);
})
