import { Router } from "express"
import { AuthMiddleware } from "../middleware";
import { SigninSchema, SignUpSchema } from "../types";
import { prismaclient } from "../db";
import jwt from "jsonwebtoken"
import { JWT_PASSWORD } from "../config";

const router = Router();

router.get("/available",async (req,res)=>{
    const availableTrigger = await prismaclient.triggerType.findMany({})
    
    res.json({
        availableTrigger
    })
})

export const triggerRouter = router;  