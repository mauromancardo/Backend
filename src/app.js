import Express from "express";
import { ProductManagerFiles } from "./persitence/productManageerFiles.js";
const port = 8080;

const app = Express();

app.listen(port, () => console.log("servidor funcionando"));

const managerProductService = new ProductManagerFiles(
  "./src/files/productoss.json"
);

console.log(managerProductService);

app.get("/products", async (req, res) => {
  try {
    await managerProductService.createProduct({
      nombre: "coca cocla",
      description: "bebida",
      precio: "700",
      img: "./imagen/coca.png",
      code: "1",
      stock: "5",
    });
    await managerProductService.createProduct({
      nombre: "fanta",
      description: "bebida",
      precio: "800",
      img: "./imagen/coca.png",
      code: "2",
      stock: "5",
    });
    await managerProductService.createProduct({
      nombre: "sprite",
      description: "bebida",
      precio: "900",
      img: "./imagen/coca.png",
      code: "3",
      stock: "5",
    });

    const products = await managerProductService.getProduct();
    /* res.send(products); */
const {limit} = req.query;
const limitNumber = parseInt(limit);
if (limit){
    const productLimit = products.slice(0, limitNumber);
    res.send(productLimit);
}
else{
    res.send(products)
}
  } catch (error) {
    res.send(error.message);
  }
});

app.get("/products/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const parsedProductId = parseInt(productId);
    const product = await managerProductService.getProductById(parsedProductId);
    if (product) {
      res.send(product);
    } else {
      res.send("id no encontrado");
    }
  } catch (error) {
    res.send(error.nessage);
  }
});


