import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { db } from "../database/database.connection.js";

export async function signup(req, res) {
    const { nome, email, senha } = req.body;
    console.log(req.body);
    
    try {
        const usuario = await db.collection("users").findOne({ email })
        if (usuario) return res.status(409).send("E-mail já cadastrado")

        console.log(senha);
        const hash = bcrypt.hashSync(senha, 10);

        await db.collection("users").insertOne({ nome, email, senha: hash });
        res.sendStatus(201);
    } catch(err) {
        res.status(500).send(err.message);
    }
}

export async function login(req, res) {
    const { email, senha } = req.body;

    try {
        const usuario = await db.collection("users").findOne({ email });
        if (!usuario) return res.status(401).send("E-mail não cadastrado");

        const correctPassword = bcrypt.compareSync(senha, usuario.senha);
        if (!correctPassword) return res.status(401).send("Senha incorreta");

        const token = uuid();
        await db.collection("sessions").insertOne({token, userId: usuario._id});
        res.send({token, userName: usuario.nome});
    } catch(err) {
        res.status(500).send(err.message);
    }
}

export async function logout(req, res) {
    const { token } = res.locals.sessions;
    try {
        await db.collection("sessions").deleteOne({ token })
        res.sendStatus(200);
    } catch(err) {
        res.status(500).send(err.message);
    }
}