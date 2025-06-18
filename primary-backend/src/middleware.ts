import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import { JWT_PASSWORD } from "./config";
export const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {

    const token = req.headers.authorization as unknown as string;
    try {
        const payload = jwt.verify(token, JWT_PASSWORD);
        //@ts-ignore
        req.id = payload.id;
        next();

    } catch (e) {
        res.status(411).json({
            message: "you are not logged in"
        })
        return;
    }

}


// //{
//     "AvaliableTriggerID": "webhook",
//     "triggerMetadata": {},
//     "actions":[{
//         "AvaliableActionId": "email",
//         "actionMetadata": {}
//     },{

//         "AvaliableActionId": "sol",
//         "actionMetadata": {}
//     }]
//         }