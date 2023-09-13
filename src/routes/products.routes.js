import { Router } from "express";
import { productsService } from "../persitence/memory/index.js";
const router = Router();

router.get("/", (req, res) => {
res.json({ message: "listado de productos" });
});
router.post("/", async (req,res)=>{
    try {
        const productInfo = req.body;
    } catch (error) {
    res.json({ status: "error", message: error.message }); 
    }
})

router.get("/:pid", async (req,res)=>{
    try {const productId = parseInt(req.params.pid); //capaz ya tengo esta variable en otro lado (reviasar)
const product = await productsService.getProductById(productId)
    res.json({ message: "endpoint para obtener el producto",data:product });
        
    } catch (error) {
        res.json({status:"error",message:error.message})
    }
    
})
export { router as productsRouter };
