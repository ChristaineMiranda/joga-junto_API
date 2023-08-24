import { Router } from "express";
import guessControllers from "../controllers/guessControllers.js";
import guessSchema from "../schemas/guessSchema.js";
import validateSchema from "../middlewares/validateSchemaMiddleware.js";
const guessRoutes = Router();

guessRoutes.post("/guess",validateSchema(guessSchema.guess), guessControllers.createGuess);
guessRoutes.get("/guess/:id", guessControllers.listMyGuessesByGroup);
export default guessRoutes;