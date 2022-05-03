const res = require("express/lib/response")

const express = require("express")

const Contenedor = require("../services/productservice")
const service = new productoservice()
const {Router} = express

let arrProductos = []

let router = new Router()

router.get("/", (req, res) => {
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

router.delete("/:id", (req, res) => {
    const {id} =req.params
    const deleted =await service.deleteById(id)
    res.json({
        message: "deleted",
        deleted
    })
})


module.exports = router