import { Router } from "express";
import userRoutes from "./userRoutes.js";
import authValidate from "../middlewares/authMiddleware.js";
import groupRoutes from "./groupRoutes.js";
import guessRoutes from "./guessRoutes.js";



const routes = Router();
routes.use([userRoutes]);
routes.use(authValidate);
routes.use([groupRoutes, guessRoutes]);

export default routes;