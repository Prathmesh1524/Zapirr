import express from "express"
import { PrismaClient } from "@prisma/client";


const app = express();
app.use(express.json())

const client = new PrismaClient();


app.post("/hooks/catch/:userID/:zapID", async (req, res) => {
    const userID = req.params.userID;
    const zapID = req.params.zapID;
    const body   = req.body;

    //  store in db to a trigger
    await client.$transaction(async tx => {
        const run = await tx.zapRun.create({
            data: {
                zapId: zapID,
                meatdata: body,
            }
        })
        await tx.zapRunOutBox.create({
            data: {
                zaprunid: run.id
            }
        })
        res.json({
            msg:"webhook received"
        })
    })
})

app.listen(3000);