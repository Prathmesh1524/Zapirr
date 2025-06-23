import { Router } from "express"
import { AuthMiddleware } from "../middleware";
import { SigninSchema, SignUpSchema } from "../types";
import { prismaclient } from "../db";
import jwt from "jsonwebtoken"
import { JWT_PASSWORD } from "../config";

const router = Router();

    router.get("/available",async (req,res)=>{
        const availableActions = await prismaclient.avalibleActions.findMany({})

        res.json({
            availableActions
        })


    })

export const actionRouter =router;


