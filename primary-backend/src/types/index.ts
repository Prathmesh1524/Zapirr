import z from "zod"

export const SignUpSchema = z.object({
    username: z.string().min(6),
    password: z.string().min(6),
    name: z.string()
});


export const SigninSchema= z.object({
    username:z.string(),
    password:z.string()
});

export const ZapSchema = z.object({
    AvaliableTriggerID: z.string(),
    triggerMetadata: z.any().optional(),
    actions:z.array(z.object({
        AvaliableActionId: z.string(),
        actionMetadata: z.any().optional()
    }))
});