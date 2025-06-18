import express from "express"
import { userRouter } from "./router/user";

import cors from "cors"
import { zapRouter } from "./router/zap";

const app = express();
app.use(express.json({limit:"10mb"}));
app.use(cors())

app.use("/api/v1/user",userRouter);
app.use("/api/v1/zap",zapRouter);



app.listen(3003)