import { Router } from "express";
import validateSchema from "../middlewares/validateSchemaMiddleware.js";
import gameSchema from "../schemas/gameSchema.js";
import gameControllers from "../controllers/gameControllers.js";
import roleValidate from "../middlewares/roleMiddleware.js";

const gameRoutes = Router();
gameRoutes.post("/games", validateSchema(gameSchema.game), roleValidate, gameControllers.createGame);
gameRoutes.get("/games", gameControllers.listGames);
gameRoutes.patch("/games/:id", validateSchema(gameSchema.updateGame), roleValidate, gameControllers.updateGame);
gameRoutes.delete("/games/:id", roleValidate, gameControllers.deleteGame);
export default gameRoutes;