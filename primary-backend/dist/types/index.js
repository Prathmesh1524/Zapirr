"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZapSchema = exports.SigninSchema = exports.SignUpSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.SignUpSchema = zod_1.default.object({
    username: zod_1.default.string().min(6),
    password: zod_1.default.string().min(6),
    name: zod_1.default.string()
});
exports.SigninSchema = zod_1.default.object({
    username: zod_1.default.string(),
    password: zod_1.default.string()
});
exports.ZapSchema = zod_1.default.object({
    AvaliableTriggerID: zod_1.default.string(),
    triggerMetadata: zod_1.default.any().optional(),
    actions: zod_1.default.array(zod_1.default.object({
        AvaliableActionId: zod_1.default.string(),
        actionMetadata: zod_1.default.any().optional()
    }))
});
