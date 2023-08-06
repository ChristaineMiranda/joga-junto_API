import { Router } from "express";
import groupsControllers from "../controllers/groupsControllers.js";

const groupRoutes = Router();

groupRoutes.post("/groups", groupsControllers.createGroup);
groupRoutes.get("/groups", groupsControllers.listGroups);
groupRoutes.get("/groups/my-group", groupsControllers.myGroups);
groupRoutes.post("/groups/join/:code", groupsControllers.joinGroup);
groupRoutes.get("/groups/ranking/:id", groupsControllers.rankingGroup);
groupRoutes.get("/ranking/overall", groupsControllers.rankingOverall);

export default groupRoutes;