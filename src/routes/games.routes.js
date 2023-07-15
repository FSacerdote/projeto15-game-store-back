import {Router} from "express"
import { addGame, editGame, getGameById, getGames, getGamesByUser } from "../controllers/games.controllers.js"
import { schemaValidation } from "../middlewares/schemaValidation.middlewares.js"
import { gameSchema } from "../schemas/games.schemas.js"
import { userValidation } from "../middlewares/userValidation.middleware.js"

const gamesRouter = Router()

gamesRouter.get("/games", getGames)
gamesRouter.post("/games", schemaValidation(gameSchema), userValidation, addGame)
gamesRouter.put("/editar/:id", schemaValidation(gameSchema), editGame)
gamesRouter.get("/game/:gameId", getGameById)
gamesRouter.get("/games/:id", userValidation, getGamesByUser)

export default gamesRouter