import { prisma } from "@/prisma/prisma"
import { NextRequest, NextResponse } from "next/server"
import crypto from "crypto" 
import { findOrCreateCart } from "@/lib/find-or-create-cart"
import { CreateCartItemValues } from "@/src/dto/cart.dto"
import { updateCartTotalAmount } from "@/lib/update-cart-total-amount"
export async function GET(request:NextRequest) {
    try {
        const token = request.cookies.get("cartToken")?.value
        if (!token) {
            return NextResponse.json({totalAmount:0,items:[]})
        }

        const userCart = await prisma.cart.findFirst({
            where:{
                OR:[

                    {
                        token:token,
                    }
                ]
            },
            include:{
                cartItems:{
                    orderBy:{
                        createdAt:"desc"
                    },
                    include:{
                        productItem:{
                            include:{
                                product:true
                            }
                        },
                        ingridients:true
                }
            }
        }})

        return NextResponse.json(userCart)
    } catch (error) {
        console.log(error)
    }
}


export async function POST(request:NextRequest) {
    try {
        let token = request.cookies.get("cartToken")?.value
        if (!token) {
            token = crypto.randomUUID()
        }

        const userCart = await findOrCreateCart(token)
        const data = (await request.json()) as CreateCartItemValues
        let findCartItem = await prisma.cartItem.findFirst({
            where:{
                cartId:userCart.id,
                productItemId:data.productItemId,
                ingridients:{ every: {
                    id: {
                        in: data.ingridientsIds
                    }
                    
                }}
                
        },
        include:{
            ingridients:true,
            productItem:true
        }
    })
        if (findCartItem?.productItem.pizzaType){
            findCartItem = data.ingridientsIds?.length === findCartItem?.ingridients.length ? findCartItem : null
        }
        if (findCartItem) {
            await prisma.cartItem.update({
                where:{
                    id:findCartItem.id
                },
                data:{
                    quantity:findCartItem.quantity + 1
                }
            })

        }
        else{      
              
            await prisma.cartItem.create({ 
            data:{
                
                cartId:userCart.id,
                productItemId:data.productItemId,
                quantity:1,
                ingridients:{connect: data.ingridientsIds?.map(id=>({id}))}
            }
    })}
        const updateedUserCart = await updateCartTotalAmount(token)
        const resp = NextResponse.json(updateedUserCart)
        resp.cookies.set("cartToken",token)
        return resp
    } catch (error) {
        console.log(error)
        return  NextResponse.json({message: "Не удалось обновить корзину"}, {status:500})
    }
}