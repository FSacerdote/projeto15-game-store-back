export default (schema) => {
    return (req, res, next) => {
        const token = req.headers.authorization.replace("Bearer ", "");
        const data = req.body.userInfo;
        const items = req.body.selectedItems;

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