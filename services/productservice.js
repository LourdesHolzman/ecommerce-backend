const fs = require("fs")

class Contenedor {
    constructor(nombre){
        this.nombre = nombre;
        this.productos = []
    }

    save(obj){
        const stock = this.productos
        stock.push(obj)
        fs.readFile(`./${this.nombre}` , "utf-8" , (err, data) => {
            if(data === ""){
                console.log("El archivo esta vacio")
            fs.writeFile(`./${this.nombre}`, JSON.stringify(stock) , "utf-8", (err)=>{
                    if(err){
                        console.log("Hubo un problema, No se pudo crear el archivo.");
                    }else{
                        console.log("Se agrego contenido al Archivo correctamente");
                    }
                    const primerData = stock
                        primerData.forEach(element => {
                            console.log("el id asignado al producto es ="+" " + element.id);
                    })
                })

            }else{
                const dataFile = JSON.parse(data)
                let copy = JSON.parse(data)
                copy.push(obj)

                fs.unlink(`./${this.nombre}`, error =>{
                    if(error){
                        console.log("no se pudo renombrar");
                    }else{
                        console.log("se renombro correctamente");
                    }
                })
                fs.appendFile(`./${this.nombre}`, JSON.stringify(copy) , "utf-8", (err)=>{
                    if(err){
                        console.log("No se pudo agregar el producto a la lista");
                    }else{
                        console.log(`Se agrego ${obj.title} con Nº ID: ${obj.id}`);
                    } 
                    console.log("IDs");
                    copy.map(element => {
                        console.log(`Nombre: ${element.title}, ID: ${element.id}`);
                    })
                })
            }
        })
    }

    getById(numero){
        fs.readFile(`./${this.nombre}`, "utf-8", (err, data)=>{
            if(err){
                console.log("Error al leer")
            }else {
                let prod = JSON.parse(data)
                const itemFound = prod.find((item)=> item.id=== numero)
                if(itemFound){
                    console.log(itemFound);
                }else{
                    console.log("No se encontro ningun producto");
                }
            }
        })

    }

    getAll(){
        fs.readFile(`./${this.nombre}`, "utf-8", (err, data)=>{
            if(err){
                console.log("Error al leer")
            }else {
                const arrayProductos = JSON.parse(data)
                console.log(arrayProductos);
            }
        })
    }

    deleteById(id){
        fs.readFile(`./${this.nombre}` , "utf-8" , (err, data)=>{
            if(err){
                console.log("Error al leer")
            }else{
                const array = JSON.parse(data)
                const found = array.find((prod)=> prod.id === id)
                if(found){
                    let index = array.indexOf(found)
                        if(index > -1){
                            let productoEliminado = array.splice(index,1)
                            const producto = JSON.stringify(productoEliminado)
                            const nuevoArray = array
                            fs.writeFile(`./${this.nombre}`, JSON.stringify(nuevoArray) ,"utf-8", (err)=>{
                                if(err){
                                    console.log("Problemas al actualizar Stock");
                                }else{
                                    console.log(`El producto ${producto} fue Eliminado del Stock`);
                                }
                            })
                        }
                    }else{
                        console.log("ID incorrecto");
                    }
                }
            })
       
    }

    deleteAll(){
        fs.unlink(`./${this.nombre}`, (error)=>{
            if(error){
                console.log("No se pudo elimar el Archivo");
            }else{
                console.log("Archivo eliminado");
            }
        })
    }
    
}

let archivos = new Contenedor("d2Text.json")


function numero(){
    let num = Math.round(Math.random()*100)
    return num
}

//archivos.save({title:"remera", price:2550, img:"buzo.jpg", id: numero()})
//archivos.getById()
//archivos.getAll()
//archivos. deleteById()
//archivos.deleteAll()

module.exports= Contenedor