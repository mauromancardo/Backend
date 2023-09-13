import { ProductManagerFiles } from "../files/productManageerFiles.js";
import { CartManagerFiles } from "../files/cartManagerFiles.js";
import { __dirname } from "../../utils.js";
import path from "path";
export const productsService = new ProductManagerFiles(path.join(__dirname,"/files/productoss.json"));
export const cartsService = new CartManagerFiles(__dirname,"/files/carts.json");
