import { db } from "../database/database.connection.js";

export async function getGames(req, res){
    try {
        const games = await db.collection("games").find().toArray()
        res.send({games})
    } catch (error) {
        res.status(500).send(error)
    }
}

export async function getGameById(req,res){
    const { gameId }= req.body
    try {
        const game = await db.collection("games").findOne({_id: gameId})
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function addGame(req,res){
    const {titulo, valor, descricao, capa, genero} = req.body
    const vendedor = res.locals.sessoes.userId

    try {
        await db.collection("games").insertOne({titulo, valor, descricao, capa, genero, vendedor})
        res.send()
    } catch (error) {
        res.status(500).send(error.message)
    }
}