import { ObjectId } from "mongodb";
import dayjs from "dayjs";

import { db } from "../database/database.connection.js";

const usersColl = db.collection("users");

export default async (req, res) => {
    const { comprador, cep, email, frete } = res.locals.userInfo;
    const { items } = res.locals;
    const { isLoggedIn } = res.locals;
    console.log(items);
    try {
        if (isLoggedIn) {
            const update = await usersColl.findOneAndUpdate({ _id: new ObjectId(comprador) }, {
                $push: {
                    history: {
                        items, info: {
                            cep, email, frete,
                        }
                    }
                }
            })
        }
        res.status(201).send("Compra realizada com sucesso");
    } catch (error) {
        res.sendStatus(500);
    }

}