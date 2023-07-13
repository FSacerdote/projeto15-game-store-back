import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { db } from "../database/database.connection.js";

export async function signup(req, res) {
    const { name, email, password } = req.body;
    
    try {
        const user = await db.collection("users").findOne({ email })
        if (user) return res.status(409).send("E-mail já cadastrado")

        const hash = bcrypt.hashSync(password, 10);

        await db.collection("users").insertOne({ name, email, password: hash });
        res.sendStatus(201);
    } catch(err) {
        res.status(500).send(err.message);
    }
}

export async function login(req, res) {
    const { email, password } = req.body;

    try {
        const user = await db.collection("users").findOne({ email });
        if (!user) return res.status(401).send("E-mail não cadastrado");

        const correctPassword = bcrypt.compareSync(password, user.password);
        if (!correctPassword) return res.status(401).send("Senha incorreta");

        const token = uuid();
        await db.collection("sessions").insertOne({token, userId: user._id});
        res.send({token, userName: user.name});
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