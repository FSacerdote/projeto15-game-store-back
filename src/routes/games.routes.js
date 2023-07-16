import {Router} from "express"
import { addGame, deleteGame, editGame, getGameById, getGames, getGamesByUser } from "../controllers/games.controllers.js"
import { schemaValidation } from "../middlewares/schemaValidation.middlewares.js"
import { gameSchema } from "../schemas/games.schemas.js"
import { userValidation } from "../middlewares/userValidation.middleware.js"

const gamesRouter = Router()

gamesRouter.get("/games", getGames)
gamesRouter.post("/games", schemaValidation(gameSchema), userValidation, addGame)
gamesRouter.put("/editar/:id", schemaValidation(gameSchema), editGame)
gamesRouter.get("/game/:gameId", getGameById)
gamesRouter.get("/meusjogos", userValidation, getGamesByUser)
gamesRouter.delete("/delete/:id", userValidation, deleteGame)

export default gamesRouter