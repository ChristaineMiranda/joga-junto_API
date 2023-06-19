import { Router } from "express";
import groupsControllers from "../controllers/groupsControllers.js";

const groupRoutes = Router();

groupRoutes.post("/groups/new-group", groupsControllers.createGroup);
groupRoutes.get("/groups", groupsControllers.listGroups);
groupRoutes.post("groups/join/:id");
groupRoutes.get("/groups/ranking/:id")

export default groupRoutes;