"use server"
import { prisma } from "@/prisma/prisma";
import { CheckoutFormSchema } from "../shared/components/shared/checkout/schemas/checkout-form-schema";
import { OrderStatus, Prisma } from "@prisma/client";
import { cookies } from "next/headers";
import { sendEmail } from '@/lib/send-email';
import { PayOrderTemplate } from '../shared/components/shared/email-temapltes/pay-order';
import { OrderSuccessTemplate } from '../shared/components/shared/email-temapltes/order-success';
import { hashSync } from 'bcryptjs';

export async function createOrder(data:CheckoutFormSchema) {
    try{
        const cookiesStore = await cookies()
        const token = cookiesStore.get("cartToken")?.value
        
        if(!token){
            throw new Error("Не удалось получить токен корзины")
        }

        const userCart = await prisma.cart.findFirst({
            include: {
                user: true,
                cartItems:{
                    include:{
                        ingridients:true,
                        productItem:{
                            include:{
                                product:true 
                            }
                            }
                        }

                }
            },
            where: {
                token: token,
            }
        })
        
        if(!userCart){
            throw new Error("Корзина не найдена")
        }
        if (userCart?.totalAmount === 0){
            throw new Error("Корзина пуста")
        }


        const order = await prisma.order.create({
            data:{
                fullName: data.firstName + " " + data.lastName,
                email: data.email,
                phone: data.phone,
                address: data.address,
                comment: data.comment,
                totalAmount: userCart.totalAmount,
                status: OrderStatus.PENDING,
                orderItems:JSON.stringify(userCart.cartItems),
                token:token

            }})


        
        sendEmail("Оплатите заказ №"+order.id,await PayOrderTemplate({orderId:order.id,totalAmount:order.totalAmount,paymentUrl:""}))
        await prisma.cart.update({
                where: {
                    id: userCart.id
                },
                data:{
                    totalAmount: 0,
                    cartItems:{
                        deleteMany:{}
                    }
                }
            })
        sendEmail("Ваш заказ №"+order.id,await OrderSuccessTemplate({orderId:order.id,items:userCart.cartItems}))

    }catch (e) {
        console.log(e)
        return
    }
}

