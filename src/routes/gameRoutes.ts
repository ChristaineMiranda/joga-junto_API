import { Router } from "express";
import validateSchema from "../middlewares/validateSchemaMiddleware.js";
import gameSchema from "../schemas/gameSchema.js";
import gameControllers from "../controllers/gameControllers.js";

const gameRoutes = Router();
gameRoutes.post("/games", validateSchema(gameSchema.game), gameControllers.createGame);
gameRoutes.get("/games", gameControllers.listGames);
gameRoutes.patch("/games/:id", validateSchema(gameSchema.updateGame), gameControllers.updateGame);
gameRoutes.delete("/games/:id", gameControllers.deleteGame);
export default gameRoutes;