"use client"
import { 
    Sheet,
    SheetContent,
    SheetHeader,
    SheetFooter,
    SheetTitle,
    SheetTrigger,
 } from "@/src/shared/components/ui/sheet";
import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { useCart } from "../../store/cart";
import { ReactNode, useEffect } from "react";
import { CartDrawerItem } from "./cart-drawer-item";
import { getCartItemsDetails } from "@/lib/get-cart-item-details";
import { PizzaSizeType, PizzaTypeType } from "../../constants/pizza";


type props = {
    children:ReactNode;
};

export function CartDrawer({children}: props) {
  const cartState = useCart(state => state)
  useEffect(()=>{
            cartState.fetchCartItems();
            
      
      
  },[cartState.items.length])

  const onClickRemoveItem = (id:number)=>{
    cartState.removeCartItem(id)
  }

  const onClickCountButton = (type:"minus" | "plus",id:number, quantity:number)=>{
    const newQuantity = type === "minus" ? quantity - 1 : quantity + 1
    cartState.updateItemQuantity(id,newQuantity)
  }
  return (
    <Sheet>
        <SheetTrigger asChild>{children}</SheetTrigger>
        <SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
            <SheetHeader>
                <SheetTitle>
                    В корзине <span className="font-bold">{cartState.items.length} товара</span>
                </SheetTitle>
            </SheetHeader>
            
            <div className="-mx-6 mt-5 overflow-auto scrollbar flex-1 ">
                {
                    cartState.items.map((item)=>(
                        <div key = {item.id} className="mb-5">
                            <CartDrawerItem
                            id={item.id}
                            imageUrl={item.imageUrl}
                            details={
                                item.pizzaSize && item.pizzaType 
                                ?  getCartItemsDetails(item.pizzaType as PizzaTypeType,item.pizzaSize as PizzaSizeType,item.ingredients) 
                                : ""}
                            name={item.name}
                            price={item.price}
                            quantity={item.quantity}
                            onClickCountButton={(type)=> onClickCountButton(type,item.id,item.quantity)}
                            onClickRemoveItem={()=>onClickRemoveItem(item.id)}
                            />
                        </div>
                    ))
                }

                
            </div>
            
            <SheetFooter className="-mx-6 bg-white p-8">
                <div className="w-full">
                  <div className="flex mb-4">
                    <span className="flex flex-1 text-lg text-neutral-500">
                      Итого
                      <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
                    </span>

                    <span className="font-bold text-lg">{cartState.totalAmount} ₽</span>
                  </div>

                  <Link href="/checkout">
                    <Button
                    loading={cartState.loading}
                      type="submit"
                      className="w-full h-12 text-base">
                      Оформить заказ
                      <ArrowRight className="w-5 ml-2" />
                    </Button>
                  </Link>
                </div>
            </SheetFooter>
        </SheetContent>
    </Sheet>
  );
}