import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import groupsService from "../services/groupsService.js";

async function listGroups (req:Request, res: Response, next: NextFunction) {
    try {
        const list = await groupsService.listGroups();
        return res.status(httpStatus.OK).send(list);
    } catch (error) {
        console.log(error)
    }
}

async function createGroup(req:Request, res:Response, next:NextFunction) {
    const { user } = res.locals;
    const { name } = req.body;
    try {
        const newGroup = await groupsService.createGroup(user, name);
        return res.status(httpStatus.CREATED).send(newGroup);
    } catch (error) {
        return res.send(error);
    }    
}

async function joinGroup(req:Request, res:Response, next:NextFunction) {
    const { code } = req.params;
    console.log(code)
    const {user} = res.locals;
    try {
        await groupsService.joinGroup(code, user);
        return res.sendStatus(httpStatus.OK);
    } catch (error) {
        return res.send(error);
    }


}

export default {
    listGroups,
    createGroup,
    joinGroup
}