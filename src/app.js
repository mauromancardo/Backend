import  Express  from "express";
import { ProductManagerFiles } from "./persitence/productManageerFiles.js";
const port = 8080;

const app = Express();

app.listen(port,()=>console.log("servidor funcionando"))

const managerProductService = new ProductManagerFiles("./src/files/productoss.json");

console.log(managerProductService);

app.get("/products", async (req,res) => {
    try{ const products = await managerProductService.getProduct()
    res.send(products)}
    catch(error){
        res.send(error.message)
    }}
);