import httpStatus from "http-status";
import { Request, Response, NextFunction} from 'express';


function errorhandlingMiddleware(err, req: Request, res: Response, next: NextFunction){

    if(err.name === "DuplicatedEmailError" || err.name === "InvalidDoctorId" || err.name === "AppointmentUnavailable"){
        return res.status(httpStatus.CONFLICT).send(err.message);
    }
    if(err.name === "incorrectFieldsError"){
        console.log(err.message)
        return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(err.message);
    }
    if(err.name === "InvalidCredentialsError" || err.name === "Unauthorized"){
        return res.status(httpStatus.UNAUTHORIZED).send(err.message);
    }
    if(err.name ==="GameAlreadyRegistered"){
        return res.status(httpStatus.CONFLICT).send(err.message);
    }
    if(err.name === "GameNotFound"|| err.name === "NotFoundError" || err.name === "NotFound"){
        return res.status(httpStatus.NOT_FOUND).send(err.message)
    }
}

export default errorhandlingMiddleware;