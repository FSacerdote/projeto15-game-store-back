import { ObjectId } from "mongodb";
import { db } from "../database/database.connection.js";

export async function getGames(req, res) {
    try {
        const games = await db.collection("games").find().toArray()
        res.send({ games })
    } catch (error) {
        res.status(500).send(error)
    }
}

export async function getGameById(req, res) {
    const { gameId } = req.params
    try {
        const game = await db.collection("games").findOne({ _id: new ObjectId(gameId) })
        res.send(game)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function getGamesByUser(req, res) {
    const { userId } = res.locals.sessoes
    try {
        const games = await db.collection("games").find({ vendedor: userId }).toArray()
        res.send(games)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function addGame(req, res) {
    const { titulo, valor, descricao, capa, genero } = req.body
    const vendedor = res.locals.sessoes.userId

    try {
        const newGame = { titulo, valor, descricao, capa, genero, vendedor };
        await db.collection("games").insertOne(newGame);
        res.status(201).send(newGame);
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function editGame(req, res) {
    const { id } = req.params
    const { titulo, valor, descricao, capa, genero } = req.body

    const gameEditado = { titulo, valor, descricao, capa, genero }
    try {
        await db.collection("games").updateOne({ _id: new ObjectId(id) }, { $set: gameEditado })
    } catch (error) {
        res.status(500).send(error.message)
    }
}