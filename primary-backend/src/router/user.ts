import { Router } from "express"
import { AuthMiddleware } from "../middleware";
import { SigninSchema, SignUpSchema } from "../types";
import { prismaclient } from "../db";
import jwt from "jsonwebtoken"
import { JWT_PASSWORD } from "../config";

const router = Router();


// User cna signup via this route
router.post("/signup", async (req, res) => {
    const body = req.body;
    const parsedData = SignUpSchema.safeParse(body);
    console.log(parsedData);
    
//input validation
    if (!parsedData.success) {
        res.status(411).json({
            msg: "invalid Inputs"
        })
        return;
    }
    const UserExist = await prismaclient.user.findFirst({
        where: {
            email: parsedData.data.username
        }
    });

    if (UserExist) {
        res.status(403).json({
            msg: "User alreay Exist"
        })
        return;
    }

//creating a new user in the database
    await prismaclient.user.create({
        data: {
            email: parsedData.data.username,
            password: parsedData.data.password,
            name: parsedData.data.name,
            triggerID:""
        }
    })

    res.json({
        message:"verify your email"
    })
    // AWAIT SENDEMAIL
})
//
// signin route 
router.post("/signin", async (req, res) => {
    const body = req.body;

    const signIndata = SigninSchema.safeParse(body);
    if (!signIndata.success) {
        res.status(411).json({
            msg: "User does not exits.."
        })
        return;
    }
    const user = await prismaclient.user.findFirst({
        where: {
            email: signIndata.data.username,
            password: signIndata.data.password
        }
    })
    if (!user) {
        res.status(411).json({
            message: "Incorect Inputs..."
        })
        return;
    }

    // set the JWT/ cookies on the browser
    const token = jwt.sign({
        id: user.id
    }, JWT_PASSWORD)
    res.json({
        token: token
    })
})
//USER DEATILS

// to get who is looged in 
router.get("/user", AuthMiddleware, async (req, res) => {
    
    
    //@ts-ignore
    const id =req.id;
    const userDetails =await prismaclient.user.findFirst({
        where:{
            id
        },
        select:{
            name:true,
            email:true
        }
    });
    res.json({
        Detils: userDetails
    })

})


export const userRouter = router;