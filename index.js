const express = require("express");
const { Server: HttpServer } = require('http')
const { Server: Socket } = require('socket.io');
const arr = require("./routes/arr");
const app = express()

const ContenedorArchivo = require("./services/ContenedorArchivo")




const httpServer = new HttpServer(app)
const io = new Socket(httpServer)

// const contenedor = new Contenedor("../mensajes.json")
const productosApi = new ContenedorArchivo("../productos.json")
const mensajesApi = new ContenedorArchivo("../mensajes.json")



//--------------------------------------------
// configuro el socket

io.on('connection', async socket => {
    console.log('Nuevo cliente conectado!');

    // carga inicial de productos
    socket.emit('productos', await productosApi.listarAll());

    // actualizacion de productos
    socket.on('update', async producto => {
        productosApi.guardar(producto)
        io.sockets.emit('productos', await productosApi.listarAll());
    })

    // carga inicial de mensajes
    socket.emit('mensajes', await mensajesApi.listarAll());

    // actualizacion de mensajes
    socket.on('nuevoMensaje', async mensaje => {
        mensaje.fyh = new Date().toLocaleString()
        await mensajesApi.guardar(mensaje)
        io.sockets.emit('mensajes', await mensajesApi.listarAll());
    })
});

//--------------------------------------------
// agrego middlewares

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))



//app.use(express.json())



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

//--------------------------------------------
// inicio el servidor

const PORT = 8080
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))








//app.listen(8080, () => {
//    console.log("server is ok")
//});