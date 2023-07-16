import { ObjectId } from "mongodb";
import dayjs from "dayjs";

import { db } from "../database/database.connection.js";

const usersColl = db.collection("users");

export default async (req, res) => {
    const { vendedor, comprador, email, cep, frete, selectedItems } = req.body;
    const { isLoggedIn } = res.locals;

    //Update seller's wallet
    try {
        selectedItems.forEach(async item => {
            await usersColl.findOneAndUpdate({ vendedor: new ObjectId(vendedor) }, {
                $inc: { wallet: item.itemPrice },
                $push: {
                    history: {
                        date: dayjs().format("DD/MM/YYYY"),
                        itemName: item.itemName,
                        price: item.itemPrice,
                        quantidade: item.itemQtde,
                        action: "sell",
                        comprador: {
                            comprador: isLoggedIn ? new ObjectId(comprador) : comprador,
                            email, cep, frete
                        }
                    }
                }
            })
        });
        if (isLoggedIn) {
            selectedItems.forEach(async item => {
                await usersColl.findOneAndUpdate({ vendedor: new ObjectId(comprador) }, {
                    $push: {
                        history: {
                            date: dayjs().format("DD/MM/YYYY"),
                            itemName: item.itemName,
                            price: item.itemPrice,
                            quantidade: item.itemQtde,
                            action: "buy",
                            vendedor: new ObjectId(vendedor),
                        }
                    }
                })
            })
        }
        res.status(204).send("Compra realizada com sucesso.");
    } catch (error) {
        res.sendStatus(500);
    }
}