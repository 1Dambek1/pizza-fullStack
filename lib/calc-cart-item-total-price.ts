import { CartItemDTO } from "@/src/dto/cart.dto";

export const calcCartItemTotalPrice = (item:CartItemDTO):number=>{
    const ingPrice = item.ingridients.reduce((acc, ingredient) => acc + ingredient.price, 0)
    return (ingPrice + item.productItem.price)*item.quantity 
}