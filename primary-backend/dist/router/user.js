"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const middleware_1 = require("../middleware");
const types_1 = require("../types");
const db_1 = require("../db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const router = (0, express_1.Router)();
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const parsedData = types_1.SignUpSchema.safeParse(body);
    console.log(parsedData);
    if (!parsedData.success) {
        res.status(411).json({
            msg: "invalid Inputs"
        });
        return;
    }
    const UserExist = yield db_1.prismaclient.user.findFirst({
        where: {
            email: parsedData.data.username
        }
    });
    if (UserExist) {
        res.status(403).json({
            msg: "User alreay Exist"
        });
        return;
    }
    yield db_1.prismaclient.user.create({
        data: {
            email: parsedData.data.username,
            password: parsedData.data.password,
            name: parsedData.data.name,
            triggerID: ""
        }
    });
    res.json({
        message: "verify your email"
    });
    // AWAIT SENDEMAIL
}));
router.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const signIndata = types_1.SigninSchema.safeParse(body);
    if (!signIndata.success) {
        res.status(411).json({
            msg: "User does not exits.."
        });
        return;
    }
    const user = yield db_1.prismaclient.user.findFirst({
        where: {
            email: signIndata.data.username,
            password: signIndata.data.password
        }
    });
    if (!user) {
        res.status(411).json({
            message: "Incorect Inputs..."
        });
        return;
    }
    // set the JWT
    const token = jsonwebtoken_1.default.sign({
        id: user.id
    }, config_1.JWT_PASSWORD);
    res.json({
        token: token
    });
}));
//USER DEATILS
router.get("/user", middleware_1.AuthMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const id = req.id;
    const userDetails = yield db_1.prismaclient.user.findFirst({
        where: {
            id
        },
        select: {
            name: true,
            email: true
        }
    });
    res.json({
        Detils: userDetails
    });
}));
exports.userRouter = router;
