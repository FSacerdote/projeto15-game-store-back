import { Router } from "express"
import gamesRouter from "./games.routes.js"
import userRouter from "./users.routes.js"


const router = Router()
router.use(gamesRouter)
router.use(userRouter)

export default router