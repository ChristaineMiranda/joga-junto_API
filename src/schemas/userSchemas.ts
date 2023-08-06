import joi from "joi";

const signup = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    confirmPassword: joi.valid(joi.ref('password')).required(),
    foto: joi.string().uri().required()
});
const signIn = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
})
export default {signup, signIn}