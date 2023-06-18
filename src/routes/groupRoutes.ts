import { Router } from "express";

const groupRoutes = Router();

groupRoutes.post("/new-group");
groupRoutes.get("/groups");
groupRoutes.post("/join-group");

export default groupRoutes;