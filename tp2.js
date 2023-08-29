import * as FileSystem from 'fs'; 

class ProductManager {
    
    constructor(filePatch) {
        this.filePatch = filePatch;
    }
    async fileExist() {
        return FileSystem.existsSync(this.filePatch);
    }
    async getProduct() {
        try {
            if (this.fileExist()) {
                const contenido = await FileSystem.promises.readFile(this.filePatch, "utf-8");
                const contenidoJson = JSON.parse(contenido);
               return contenidoJson
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
                const contenidoJson = JSON.parse (contenido);
                contenidoJson.push(productInfo); 
                await FileSystem.promises.writeFile(this.filePatch, JSON.stringify(contenidoJson, null, "\t"));
                console.log("producto agregado");
            }
            else { throw new Error("No es posible guardar el producto") };
        }
        catch (error) {
            console.log(error.message);
            throw error;
        } 
    }
    
};

const operations = async ()=> {
    try {
        const manager = new ProductManager("./backEnd/productos.json");
        const products = await manager.getProduct();
        console.log("Contenido de productos.json:", products);
        await manager.createProduct({nombre:"hola", precio:"123"})
    }
    catch(error){
    console.log(error.message)}
}

  
operations();