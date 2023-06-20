import { Router } from "express";

const guessRoutes = Router();

guessRoutes.post("/guess/new-guess");

export default guessRoutes;