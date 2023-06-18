import { Router } from "express";
import userControllers from "../controllers/userControllers.js";
import userSchema from "../schemas/userSchemas.js";
import validateSchema from "../middlewares/validateSchemaMiddleware.js";

const userRoutes = Router();

userRoutes.post("/signup", validateSchema(userSchema.signup) , userControllers.signUp);
userRoutes.post("/signin", validateSchema(userSchema.signIn), userControllers.signIn);

export default userRoutes;