import { useEffect } from "react";
import { CartState, useCart } from "../store/cart";
import { cart } from "../service/cart-service";

interface ReturnProps {
    cartState:CartState,
    onClickRemoveItem: (id:number) => void,
    onClickCountButton:(type:"minus" | "plus",id:number, quantity:number) => void
}

export const useDataCart = ():ReturnProps=>{
      const cartState = useCart(state => state)
      useEffect( ()=>{
        const fetchData = async ()=>{
            await cartState.fetchCartItems()
        } 
        fetchData()
      }
      ,[cartState])
    
      const onClickRemoveItem = (id:number)=>{
        cartState.removeCartItem(id)
      }
    
      const onClickCountButton = (type:"minus" | "plus",id:number, quantity:number)=>{
        const newQuantity = type === "minus" ? quantity - 1 : quantity + 1
        cartState.updateItemQuantity(id,newQuantity)
      }

      return {
        cartState,
        onClickCountButton,
        onClickRemoveItem
      }
}