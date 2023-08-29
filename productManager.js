class ProductManager {
    constructor (filePatch){
        this.filePatch = filePatch;
    };
    
    getProductos(){
        console.log(this.productos);
    }
    getProductoById(id) {
        //buscar id y retornar producto con la coincidencia 
        const product = this.productos.find(producto => producto.id === id);
        return product || null;
    }
    agregarProducto(title, description, price, code, stock) {
        // Verificar si ya existe un producto con el mismo código
        const existingProduct = this.productos.find(producto => producto.code === code);

        if (existingProduct) {
            console.log(`Ya existe un producto con el código ${code}. No se pudo agregar.`);
            return;}
        if (!title || !description || !price){
            return console.log ("todos los campos son obligatorios")
        }

        let newId
        if (this.productos.length==0){
            newId= 1;   
        }
        else {
            newId=this.productos[this.productos.length-1].id+1
        }; 
        const nuevoProducto =  {
            id : newId,
            title,
            description,
            price,
            code,
            stock,

        }
        this.productos.push(nuevoProducto);
        
    }
    
}

const producto1 = new ProductManager ();
producto1.getProductos();
producto1.agregarProducto("coca cola","bebida", 700, 1, 14,);
producto1.agregarProducto("fanta", "bebida", undefined, 2, 17,);
console.log(producto1)

const foundProduct = producto1.getProductoById(2);
if (foundProduct) {
    console.log("Producto encontrado:", foundProduct);
} else {
    console.log("Not found .");
}