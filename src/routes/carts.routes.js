import { Router } from "express";
import { cartsService } from "../persitence/memory/index.js";
const router = Router();

router.get("/", async (req, res) => {
  try {
    const carts = await cartsService.getCarts();
    res.json({ data:carts });
  } catch (error) {
    res.json({ error:error.message });
  }
});




export {router as cartsRouter};