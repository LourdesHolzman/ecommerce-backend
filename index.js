const express = require("express");
const arr = require("./routes/arr");
//const productRoutes = require("./routes/productos")
const app = express()


//app.use("/static", express.static("public"))

//app.get("/", (req, res) => {
//    res.sendFile(__dirname + "/public/index.html")
//})

//app.get("/imagen", (req, res) => {
//    res.sendFile(__dirname + "/public/img.jpg")
//})

app.use(express.json())

//app.use("/productos", productRoutes)

//app.get("/productos/getAll", (req, res) => {
//    res.sendFile(arrProductos)
//})


app.get("/", (req, res) => {
    res.send({
        message:"Productos",
        data:arr
    });
});

app.get("/:id", (req, res) => {
    let id = req.params.id;

    let arrNew = arr.filter((x) => {
        return x.id == id
    });
    console.log(arrNew);
    res.send({
        message:"id seleccionado",
        data:arrNew[0],
    });
});

app.post("/productos", (req, res) => {
    console.log(req.body)
    let nuevo = {
        id:Math.round(Math.random()*100),
        producto: req.body.producto,
        descripcion: req.body.descripcion,
    }
    arr.push(nuevo)
    res.send({
        message:"nuevo producto",
        data:nuevo,
    });
    
})






app.listen(8080, () => {
    console.log("server is ok")
});