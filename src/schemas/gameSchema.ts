import coreJoi from "joi";
import joiDate from "@joi/date";
const joi = coreJoi.extend(joiDate) as typeof coreJoi;

const game = joi.object({
    firstTeam: joi.string().required(),
    secondTeam: joi.string().required(),
    date: joi.date().format("YYYY-MM-DD").required(),
    time: joi.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/).required(),
    step: joi.string().required(),
    round: joi.string().required(),
    trip: joi.string().required()
});

const updateGame = joi.object({
    firstTeam: joi.string(),
    secondTeam: joi.string(),
    date: joi.date().format("YYYY-MM-DD"),
    time: joi.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/),
    step: joi.string(),
    round: joi.string(),
    trip: joi.string(),
    goalsFirst: joi.number(),
    goalsSecond: joi.number(),
    winner:  joi.string() 
});

export default { 
    game,
    updateGame
}