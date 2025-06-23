"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const zap_1 = require("./router/zap");
const user_1 = require("./router/user");
const actions_1 = require("./router/actions");
const trigger_1 = require("./router/trigger");
const app = (0, express_1.default)();
app.use(express_1.default.json({ limit: "10mb" }));
app.use((0, cors_1.default)());
app.use("/api/v1/user", user_1.userRouter);
app.use("/api/v1/zap", zap_1.zapRouter);
app.use("/api/v1/trigger", trigger_1.triggerRouter);
app.use("/api/v1/actions", actions_1.actionRouter);
app.listen(3003);
