import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import groupsService from "../services/groupsService.js";

async function listGroups(req: Request, res: Response, next: NextFunction) {
    const {user} = res.locals as {user:number};
    try {
        const list = await groupsService.listGroups(user);
        return res.status(httpStatus.OK).send(list);
    } catch (error) {
        next(error)
    }
}
async function myGroups(req: Request, res: Response, next: NextFunction) {
    const { user } = res.locals as {user:number};
    try {
        const myGroup = await groupsService.myGroups(user);
        return res.status(httpStatus.OK).send(myGroup);
    } catch (error) {
        next(error)
    }
}

async function createGroup(req: Request, res: Response, next: NextFunction) {
    const { user } = res.locals as {user:number};
    const { name } = req.body as {name:string};

    try {
        const newGroup = await groupsService.createGroup(user, name);
        return res.status(httpStatus.CREATED).send(newGroup);
    } catch (error) {
      next(error);
    }
}

async function joinGroup(req: Request, res: Response, next: NextFunction) {
    const {id} = req.body;
    const { user } = res.locals;   
    try {
        await groupsService.joinGroup(user, id);
        return res.sendStatus(httpStatus.OK);
    } catch (error) {
        next(error);
    }

}

async function rankingGroup(req:Request, res:Response, next:NextFunction) {
    const id = Number(req.params.id);

    try {
        const rankingList = await groupsService.rankingGroup(id);
        return res.status(httpStatus.OK).send(rankingList);        
    } catch (error) {
        next(error);
    }    
}

async function rankingOverall(req:Request, res:Response, next:NextFunction) {
    try {
        const ranking = await groupsService.rankingOverall();
        return res.status(httpStatus.OK).send(ranking);        
    } catch (error) {
        next(error);
    }
}



export default {
    listGroups,
    myGroups,
    createGroup,
    joinGroup,
    rankingGroup,
    rankingOverall,}