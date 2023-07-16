import { Router } from "express";
import cartSchema from "../schemas/cart.schema.js";
import cartValidation from "../middlewares/cartValidation.js";
import makeOrder from "../controllers/cart.controller.js";

const cartRouter = Router();

cartRouter.post("/carrinho", cartValidation(cartSchema), makeOrder);

export default cartRouter;