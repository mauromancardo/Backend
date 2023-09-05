import * as FileSystem from 'fs';
import express  from 'express';



class ProductManager {
    constructor(filePatch) {
        this.filePatch = filePatch;}
    async fileExist() {
        return FileSystem.existsSync(this.filePatch);
    }
    async getProduct() {
        try {
            if (this.fileExist()) {
                const contenido = await FileSystem.promises.readFile(this.filePatch, "utf-8");
                const contenidoJson = JSON.parse(contenido);
                console.log(contenidoJson)
            }
            else { throw new Error("No es posible leer el producto") };
        }
        catch (error) {
            console.log(error.message);
            throw error;
        }
    }
    async createProduct(productInfo) {
        try {
            if (this.fileExist()) {
                const contenido = await FileSystem.promises.readFile(this.filePatch, "utf-8");
                const contenidoJson = JSON.parse(contenido);
                // validar codigo unico 
                const codeExist = contenidoJson.some((product) => 
                    product.code === productInfo.code
                );

                if (codeExist) {
                    console.log(`codigo ${productInfo.code} ya existe `)
                }
                else {//id autoincrementable 
                    const id = contenidoJson.reduce((maxId, product) => {
                        return product.id > maxId ? product.id : maxId;
                    }, 0);
                
                const newId = id + 1;
                productInfo.id = newId;
                //agregar producto
                contenidoJson.push(productInfo);
                await FileSystem.promises.writeFile(this.filePatch, JSON.stringify(contenidoJson, null, "\t"));
                console.log("producto agregado");}
            };
        }
        catch (error) {
            console.log(error.message);
            throw error;
        }} 
    async getProductById (id){
        try{
            if (this.fileExist()){
                const contenido = await FileSystem.promises.readFile(this.filePatch, "utf-8");
                const contenidoJson = JSON.parse(contenido);

                //metodo find 
                const producto =contenidoJson.find((product)=>product.id === id);
                if (producto){
                    console.log(`id del producto${id}`, producto)
                }
                else{console.log(" no se encontro el producto")}
            }
        }
        catch (error){
            console.log(error)
        }
    }    
    async modificarProducto (id, productomodificado){
        try{
            if (this.fileExist()){
                const contenido = await FileSystem.promises.readFile(this.filePatch, "utf-8")
                const contenidoJson = JSON.parse(contenido)
                const productIndex = contenidoJson.findIndex((product =>{
                return product.id ===id}))

                if (productIndex !== -1){
                    contenidoJson[productIndex]= {...contenidoJson[productIndex], ...productomodificado}
                    await FileSystem.promises.writeFile(this.filePatch, JSON.stringify(contenidoJson, null,"\t"))
                    console.log ("archivo modificado ")
                }
                else {console.log ("no se pudo modificar el archivo")}
                
            }
        }
        catch(error){
            console.log("modificar producto : ", error.message)
        }
    };
    async eliminarProducto (id ){
        try{
            if (this.fileExist()){
                const contenido = await FileSystem.promises.readFile(this.filePatch, "utf-8")
                const contenidoJson = JSON.parse(contenido)
                const arrayFiltrado = contenidoJson.filter((producto)=> producto.id !== id)
                await FileSystem.promises.writeFile(this.filePatch, JSON.stringify(arrayFiltrado, null, "\t"))
                console.log("array con producto eliminado ")
        }}

        catch(error ){console.log("no se pudo eliminar el producto")}
    }}
    
    const operations = async () => {
        try {
            const manager = new ProductManager("./productos.json");
            await manager.createProduct({ nombre: "coca cocla", description: "bebida", precio: "700", img: "./imagen/coca.png", code: "1", stock: "5" })
            await manager.createProduct({ nombre: "fanta", description: "bebida", precio: "800", img: "./imagen/coca.png", code: "2", stock: "5" })
            await manager.createProduct({ nombre: "sprite", description: "bebida", precio: "900", img: "./imagen/coca.png", code: "3", stock: "5" })
            
            await manager.getProductById();
            await manager.modificarProducto(1,{description:"gaseosa"});
            await manager.eliminarProducto(2);
            await manager.getProduct();
        }
        catch (error) {
            console.log(error.message)
        }
    }
    operations();