import { Request, Response, NextFunction } from 'express';
import errors from '../errors/index.js';

export default function validateSchema(schema){
    return (req: Request, res: Response, next: NextFunction) => {
        const {error} = schema.validate(req.body, {abortEarly: false});
        if(error){
            const errorsList = error.details.map((detail) => (detail.message));
            throw errors.incorrectFieldsError(errorsList);
        }
        next();
    }
}