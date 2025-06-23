import express from "express"


import cors from "cors"
import { zapRouter } from "./router/zap";
import { userRouter } from "./router/user";
import { actionRouter } from "./router/actions";
import { triggerRouter } from "./router/trigger";

const app = express();
app.use(express.json({limit:"10mb"}));
app.use(cors())

app.use("/api/v1/user",userRouter);
app.use("/api/v1/zap",zapRouter);
app.use("/api/v1/trigger",triggerRouter);
app.use("/api/v1/actions",actionRouter);



app.listen(3003)