import * as FileSystem from "fs";

class CartManagerFiles {
  constructor(path) {
    this.pathFile = path;
  }
  //corroborar si el archivo existe
  fileExist() {
    return fs.existsSync(this.path);
  }
  //consultar carritos
  async getCarts() {
    try {
      if (this.fileExist()) {
        const contenido = await fs.promises.readFile(this.path, "utf-8");
        const contenidoJson = JSON.parse(contenido);
        return contenidoJson;
      } else {
        throw new Error("error getting the carts");
      }
    } catch (error) {
      throw new Error("get carts error: ", error.message);
    }
  }
};



export { CartManagerFiles };
