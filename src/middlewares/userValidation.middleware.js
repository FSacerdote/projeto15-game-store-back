import { db } from "../database/database.connection.js";

export async function userValidation(req, res, next){
    const { authorizaton } = req.headers;
    const token = authorizaton?.replace("Bearer ", "");

    if(!token) return res.sendStatus(401);

    try {
        const sessions = await db.collection("sessions").findOne({ token })
        if (!sessions) return res.sendStatus(401);
        res.locals.sessions = sessions;
        next();
    } catch(err) {
        res.status(500).send(err.message);
    }
}