import { Request, Response, NextFunction } from "express";
import userRepositories from "../repositories/userRepositories.js";
import errors from "../errors/index.js";

export default async function roleValidate(req: Request, res: Response, next: NextFunction) {
    const userId:number = res.locals.user;
    try {
        const user = await userRepositories.findUserById(userId);
        if(user.role === "ADMIN") next();

        else throw errors.unauthorized();
    } catch (error) {
        next(error);
    }
    
}