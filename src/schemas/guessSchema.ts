import joi from "joi";


const guess = joi.object({
    gameId: joi.number().integer().required(),
    codeGroup: joi.string().required(),
    goalsFirstTeam: joi.number().integer().required(),
    goalsSecondTeam: joi.number().integer().required()
});

export default { guess }