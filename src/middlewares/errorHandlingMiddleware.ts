import httpStatus from "http-status";
import { Request, Response, NextFunction} from 'express';


function errorhandlingMiddleware(err, req: Request, res: Response, next: NextFunction){

    if(err.name === "DuplicatedEmailError" || err.name === "conflict"){
        return res.status(httpStatus.CONFLICT).send(err.message);
    }
    if(err.name === "incorrectFieldsError"){
        console.log(err.message)
        return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(err.message);
    }
    if(err.name === "InvalidCredentialsError" || err.name === "Unauthorized"){
        return res.status(httpStatus.UNAUTHORIZED).send(err.message);
    }
   
    if(err.name === "GameNotFound"|| err.name === "NotFoundError" || err.name === "NotFound"){
        return res.status(httpStatus.NOT_FOUND).send(err.message)
    }

    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
}

export default errorhandlingMiddleware;