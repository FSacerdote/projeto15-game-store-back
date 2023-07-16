import joi from "joi";

export const gameSchema = joi.object({
    titulo: joi.string().required(),
    valor: joi.number().positive().required(),
    descricao: joi.string().required(),
    capa: joi.string().required(),
    genero: joi.string().required(),
});