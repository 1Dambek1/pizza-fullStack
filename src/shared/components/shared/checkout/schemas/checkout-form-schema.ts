import { z } from "zod";


export const checkoutFormSchema = z.object({
    firstName: z.string().min(2,{message:"Должно содержать не менее 2 символов"}),
    lastName: z.string().min(2,{message:"Должно содержать не менее 2 символов"}),
    email: z.string().email({message:"Неверный формат email"}),
    phone: z.string().min(10, {message:"Должно содержать не менее 10 символов"}),
    address: z.string().min(2,{message:"Должно содержать не менее 2 символов"}),
    comment: z.string().optional(),
});

export type CheckoutFormSchema = z.infer<typeof checkoutFormSchema>;