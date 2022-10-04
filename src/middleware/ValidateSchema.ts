import Joi, { ObjectSchema } from 'joi';
import { NextFunction, Response, Request } from 'express';
import Logging from '../library/Logging';
import { IRotationItem } from '../models/RotationItem';
import { IRotationEvent } from '../models/RotationEvent';

export const ValidateSchema = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req.body);
            next();
        } catch (error) {
            Logging.error(error);
            return res.status(422).json({ error });
        }
    };
};

export const Schemas = {
    rotationItem: {
        create: Joi.object<IRotationItem>({
            name: Joi.string().required(),
        }),
        update: Joi.object<IRotationItem>({
            name: Joi.string().required(),
        }),
    },
};
