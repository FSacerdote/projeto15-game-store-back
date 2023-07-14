import {Router} from "express"
import { addGame, getGames } from "../controllers/games.controllers.js"
import { schemaValidation } from "../middlewares/schemaValidation.middlewares.js"
import { gameSchema } from "../schemas/games.schemas.js"

const gamesRouter = Router()

gamesRouter.get("/games", getGames)
gamesRouter.post("/games", schemaValidation(gameSchema), addGame)

export default gamesRouter