import { prisma } from "@/prisma/prisma"
import { calcCartItemTotalPrice } from "./calc-cart-item-total-price"

export const updateCartTotalAmount =async (token:string) => {
    const userCart = await prisma.cart.findFirst({
        where:{
            token:token
        },
        include:{
            cartItems:{
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
    if (!userCart) {
        return
    }

    const totalAmout = userCart.cartItems.reduce((acc,item)=>{
        return acc+ calcCartItemTotalPrice(item)
    },0)

    return await prisma.cart.update({
        where:{
            id:userCart?.id
        },
        data:{
            totalAmount:totalAmout
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
    }
    })

}