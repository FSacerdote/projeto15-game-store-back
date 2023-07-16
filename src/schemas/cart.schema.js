import joi from "joi";

export default (data) => joi.object({
    comprador: joi.string().required(),
    email: joi.string().email().required(),
    cep: joi.string().length(8).required(),
    frete: joi.string().valid("gratis", "sedex").required(),
}).validate(data);