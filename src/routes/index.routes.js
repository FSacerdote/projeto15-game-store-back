import { Router } from "express";
import gamesRouter from "./games.routes.js";
import authRouter from "./users.routes.js";
import userRouter from "./users.routes.js";
import cartRouter from "./cart.routes.js";


const router = Router();
router.use(gamesRouter);
router.use(userRouter);
router.use(cartRouter);

export default router;