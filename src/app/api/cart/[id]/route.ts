import { updateCartTotalAmount } from "@/lib/update-cart-total-amount";
import { prisma } from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request:NextRequest, {params}: {params: Promise<{id:string}>}) {
    try {
        const {id} = await  params;
        const body = (await request.json()) as {quantity:number};
        const token = request.cookies.get("cartToken")?.value
        if (!token) {
            return NextResponse.json({message:"Не удалось найти токен"}, {status:401})
        }
        const CartItem = await prisma.cartItem.findFirst({
            where:{
                id:Number(id),
                // cart:{
                //     token:token
                // }
            }
        })
        if (!CartItem) {
            return NextResponse.json({message:"Не удалось найти продукт"}, {status:401})
        }
        await prisma.cartItem.update({
            where:{
                id:Number(id)
            },
            data:{
                quantity:body.quantity
            }
        })
        
        const updateedUserCart = await updateCartTotalAmount(token)
        return NextResponse.json(updateedUserCart)

    } catch (error) {
        console.log(error)
        return  NextResponse.json({message: "Не удалось обновить корзину"}, {status:500})
    }
}

export async function DELETE(request:NextRequest, {params}: {params: Promise<{id: string}>}) {
    try {
        const {id} = await  params;
        const token = request.cookies.get("cartToken")?.value
        if (!token) {
            return NextResponse.json({message:"Не удалось найти токен"}, {status:401})
        }
        const CartItem = await prisma.cartItem.findFirst({
            where:{
                id:Number(id),
                cart:{
                    token:token
                }
            }
        })
        if (!CartItem) {
            return NextResponse.json({message:"Не удалось найти продукт"}, {status:401})
        }
        await prisma.cartItem.delete({
            where:{
                id:Number(id)
            }
        })
        
        const updateedUserCart = await updateCartTotalAmount(token)
        return NextResponse.json(updateedUserCart)

    } catch (error) {
        console.log(error)
        return  NextResponse.json({message: "Не удалось обновить корзину"}, {status:500})
    }
}