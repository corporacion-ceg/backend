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


app.use(express.urlencoded({ extended:false }));
app.use(express.json());

const PORT = process.env.PORT || 9000;

app.use(cors());

//API REST

app.get('/productos',(req,res) => {

    db.query("SELECT * FROM productos",(err,data)=>{
        if (err) {
            return err;
        }

        res.json({productos: data});
    })

});
app.get('/productos/:id', (req, res) => {
    console.log(req.params.id);
    const ID = req.params.id;
    const sql = "SELECT * FROM productos WHERE id = ?"
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

app.post('/productos',(req,res) => {
    console.log(Object.values(req.body));
    const values = Object.values(req.body)
    const sql = "INSERT INTO productos(nombre,precio,marca) VALUES (?,?,?)"
    db.query(sql,values,(err,data)=>{
        if (err) {
            return err;
        }

        res.json({
            mensaje: "Agregado",
            data
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

        res.json(data);
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
app.get('/cuadrantes/', (req, res) => {

    db.query("SELECT * FROM cuadrantes", (err, data) => {
        if (err) {
            return err;
        }

        res.json(data);
    })


});
app.listen(PORT,()=>{
    console.log('listening on port '+PORT);
})
