import { useEffect } from "react";
import { CartState, useCart } from "../store/cart";

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
      ,[])
    
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