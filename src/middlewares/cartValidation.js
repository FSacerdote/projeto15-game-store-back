export default (schema) => {
    return (req, res, next) => {
        const { token } = req.headers;
        const data = req.body;

        const validation = schema(data);
        if (validation.error) {
            return res.status(422).send(validation.error.details.map(detail => detail.message));
        }

        if (token) {
            res.locals.isLoggedIn = true;
        } else {
            res.locals.isLoggedIn = false;
        }

        next();
    }
}