import { Router, Request } from "express";
import { ZapSchema } from "../types";
import { prismaclient } from "../db";
import { AuthMiddleware } from "../middleware";

// in this route user can able to create a zap and see the zaps and a particular zap.

interface AuthRequest extends Request {
  id: number; // Assuming user ID is a number
}

const router = Router();
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

  router.post("/", AuthMiddleware, async (req: AuthRequest, res:any) => {
  const parsedData = ZapSchema.safeParse(req.body);

  if (!parsedData.success) {
    return res.status(411).json({ message: "Invalid Inputs" });
  }

  const userId = (req as AuthRequest).id;

  try {
    const createdZap = await prismaclient.$transaction(async (tx) => {
      const user = await tx.user.findUnique({ where: { id: userId } });
      if (!user) throw new Error("User not found");

      const triggerID = parsedData.data.AvaliableTriggerID;

      for (const action of parsedData.data.actions) {
        const exists = await tx.avalibleActions.findUnique({
          where: { id: action.AvaliableActionId },
        });
        if (!exists) throw new Error(`Invalid Action ID: ${action.AvaliableActionId}`);
      }

      const zap = await tx.zap.create({
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
    });

    // ✅ Fetch with includes outside the transaction
    const fullZap = await prismaclient.zap.findUnique({
      where: { id: createdZap.id },
      include: {
        trigger: { include: { type: true } },
        actions: { include: { ActionType: true } },
      },
    });

    res.json({ message: "Created a zap", zap: fullZap });
  } catch (err: any) {
    console.error("Error creating zap:", err.message);
    res.status(500).json({ error: err.message });
  }
});


// to get all the zaps for the user only
//DONE
router.get("/", AuthMiddleware ,async (req, res) => {
  //@ts-ignore
  const id = req.id;
// it allow to see all the zaps created by the user
  const zaps = await prismaclient.zap.findMany({
    where: {
       userId:  id
    },
    include:{
      actions:{
        include:{
          ActionType:true
        }
      },
      trigger:{
        include:{
          type:true
        }
      }
    }

  })
  res.json({
    zaps
  })

  console.log("reached get the Zaps");

})

// to get particular the zaps for the user only
//done
router.get("/:zapID",async (req, res) => {
// this route will allow user to see the particular zap and what's inside the zap
  //@ts-ignore
  const id = req.id;
  const zapID= req.params.zapID;

  const zap = await prismaclient.zap.findFirst({
    where: {
      id : zapID,
      userId: id
    },
    include:{
      actions:{
        include:{
          ActionType:true
        }
      },
      trigger:{
        include:{
          type:true
        }
      }
    }

  })
  res.json({
    zap
  })

  console.log("Reached to particular Zaps");

})

export const zapRouter = router