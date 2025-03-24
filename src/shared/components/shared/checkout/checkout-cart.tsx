import { getCartItemsDetails } from "@/lib/get-cart-item-details";
import { WhiteBlock } from "../white-block";
import { PizzaSizeType, PizzaTypeType } from "@/src/shared/constants/pizza";
import { CheckoutItem } from "../checkout-item";
import { CartState } from "@/src/shared/store/cart";

type props = {
    cartState:CartState
    onClickCountButton: (type:"minus" | "plus",id:number,quantity:number)=>void;
    onClickRemoveItem: (id:number)=>void;

};

export function CheckOutCart({cartState, onClickRemoveItem, onClickCountButton}: props) {
  return (
    <WhiteBlock title="1. Корзина">
    <div className="flex flex-col gap-5">
          {
              cartState.items.map((item)=>(
                  <div key = {item.id} className="mb-5">
                      <CheckoutItem
                      id={item.id}
                      imageUrl={item.imageUrl}
                      details={
                          item.pizzaSize && item.pizzaType
                          ?  getCartItemsDetails(item.pizzaType as PizzaTypeType,item.pizzaSize as PizzaSizeType,item.ingredients)
                          : ""}
                      name={item.name}
                      price={item.price}
                      quantity={item.quantity}
                      disabled={item.disabled}
                      onClickCountButton={(type)=> onClickCountButton(type,item.id,item.quantity)}
                      onClickRemove={()=>onClickRemoveItem(item.id)}
                      />
                  </div>
              ))
          }

    </div>
    </WhiteBlock>
  );
}