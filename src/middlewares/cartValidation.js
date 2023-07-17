export default (schema) => {
    return (req, res, next) => {
        const token = req.headers.authorization.replace("Bearer ", "");
        const data = req.body.userInfo;
        const items = req.body.selectedItems;
        console.log(!items.length);
        if (items.length === 0) {
            return res.status(422).send("Adicione items ao seu carrinho para fazer um pedido.");
        }

        const validation = schema(data);
        if (validation.error) {
            return res.status(422).send(validation.error.details.map(detail => detail.message));
        }

        res.locals.userInfo = data;
        res.locals.items = items;

        if (token) {
            res.locals.isLoggedIn = true;
        } else {
            res.locals.isLoggedIn = false;
        }

        next();
    }
}