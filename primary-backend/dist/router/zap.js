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
Object.defineProperty(exports, "__esModule", { value: true });
exports.zapRouter = void 0;
const express_1 = require("express");
const types_1 = require("../types");
const db_1 = require("../db");
const middleware_1 = require("../middleware");
const router = (0, express_1.Router)();
// to make the zap
// router.post("/", AuthMiddleware, async (req, res) => {
//   const parsedData = ZapSchema.safeParse(req.body);
//   if (!parsedData.success) {
//     res.status(411).json({ message: "Invalid Inputs" });
//     return;
//   }
//   const userId = (req as AuthRequest).id;
//   try {
//     const zap = await prismaclient.$transaction(async (tx) => {
//       // 1. Ensure User Exists
//       const user = await tx.user.findUnique({ where: { id: userId } });
//       if (!user) {
//         throw new Error("User not found");
//       }
//       // 2. Ensure the AvaliableTriggerID is valid (optional, or handle later)
//       const triggerID = parsedData.data.AvaliableTriggerID;
//       // 3. Validate all action IDs exist
//       for (const action of parsedData.data.actions) {
//         const exists = await tx.avalibleActions.findUnique({
//           where: { id: action.AvaliableActionId },
//         });
//         if (!exists) {
//           throw new Error(`Invalid Action ID: ${action.AvaliableActionId}`);
//         }
//       }
//       // 4. Create Zap with related trigger and actions
//       const createdZap = await tx.zap.create({
//         data: {
//           user: {
//             connect: { id: userId },
//           },
//           trigger: {
//             create: {
//               triggerID,
//             },
//           },
//           actions: {
//             create: parsedData.data.actions.map((x, ind) => ({
//               actionID: x.AvaliableActionId,
//               sortingOrder: ind,
//             })),
//           },
//         },
//         include: {
//           trigger: true,
//           actions: true,
//         },
//       });
//       return createdZap;
//     });
//     res.json({ message: "Created a zap", zap });
//   } catch (err: any) {
//     console.error("Error creating zap:", err.message);
//     res.status(500).json({ error: err.message });
//   }
// });
router.post("/", middleware_1.AuthMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedData = types_1.ZapSchema.safeParse(req.body);
    if (!parsedData.success) {
        return res.status(411).json({ message: "Invalid Inputs" });
    }
    const userId = req.id;
    try {
        const createdZap = yield db_1.prismaclient.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
            const user = yield tx.user.findUnique({ where: { id: userId } });
            if (!user)
                throw new Error("User not found");
            const triggerID = parsedData.data.AvaliableTriggerID;
            for (const action of parsedData.data.actions) {
                const exists = yield tx.avalibleActions.findUnique({
                    where: { id: action.AvaliableActionId },
                });
                if (!exists)
                    throw new Error(`Invalid Action ID: ${action.AvaliableActionId}`);
            }
            const zap = yield tx.zap.create({
                data: {
                    user: { connect: { id: userId } },
                    trigger: { create: { triggerID } },
                    actions: {
                        create: parsedData.data.actions.map((x, ind) => ({
                            actionID: x.AvaliableActionId,
                            sortingOrder: ind,
                        })),
                    },
                },
            });
            return zap;
        }));
        // ✅ Fetch with includes outside the transaction
        const fullZap = yield db_1.prismaclient.zap.findUnique({
            where: { id: createdZap.id },
            include: {
                trigger: { include: { type: true } },
                actions: { include: { ActionType: true } },
            },
        });
        res.json({ message: "Created a zap", zap: fullZap });
    }
    catch (err) {
        console.error("Error creating zap:", err.message);
        res.status(500).json({ error: err.message });
    }
}));
// to get all the zaps for the user only
//DONE
router.get("/", middleware_1.AuthMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const id = req.id;
    // it allow to see all the zaps created by the user
    const zaps = yield db_1.prismaclient.zap.findMany({
        where: {
            userId: id
        },
        include: {
            actions: {
                include: {
                    ActionType: true
                }
            },
            trigger: {
                include: {
                    type: true
                }
            }
        }
    });
    res.json({
        zaps
    });
    console.log("reached get the Zaps");
}));
// to get particular the zaps for the user only
//done
router.get("/:zapID", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // this route will allow user to see the particular zap and what's inside the zap
    //@ts-ignore
    const id = req.id;
    const zapID = req.params.zapID;
    const zap = yield db_1.prismaclient.zap.findFirst({
        where: {
            id: zapID,
            userId: id
        },
        include: {
            actions: {
                include: {
                    ActionType: true
                }
            },
            trigger: {
                include: {
                    type: true
                }
            }
        }
    });
    res.json({
        zap
    });
    console.log("Reached to particular Zaps");
}));
exports.zapRouter = router;
