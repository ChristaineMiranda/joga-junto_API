import { Router } from "express";
import groupsControllers from "../controllers/groupsControllers.js";

const groupRoutes = Router();

groupRoutes.post("/groups", groupsControllers.createGroup);
groupRoutes.get("/groups", groupsControllers.listGroups);
groupRoutes.get("/groups/my-groups", groupsControllers.myGroups);
groupRoutes.post("/groups/join", groupsControllers.joinGroup);
groupRoutes.get("/groups/ranking/:id", groupsControllers.rankingGroup);
groupRoutes.get("/ranking", groupsControllers.rankingOverall);

export default groupRoutes;