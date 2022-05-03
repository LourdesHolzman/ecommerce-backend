const res = require("express/lib/response")

const express = require("express")

const {Router} = express

let arrProductos = []

let router = new Router()

router.get("/getAll", (req, res) => {
    res.send({data:arrProductos});
});

router.post("/create", (req, res) => {
    console.log(req.body)
    let {nombre, descripcion, precio} = req.body
    let nuevoProducto = {
        nombre,
        descripcion,
        precio
    }
    arrProductos.push(nuevoProducto)
    res.send("Nuevo producto")

});


module.exports = router