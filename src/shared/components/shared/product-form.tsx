"use client"
import toast from "react-hot-toast";
import { IProduct } from "../../@types/prisma-type";
import { useCart } from "../../store/cart";
import { ChoosePizzaForm } from "./choose-pizza-form";
import { ChooseProductForm } from "./choose-product-form";
import { useRouter } from "next/navigation";

type props = {
    product:IProduct
  className?: string;
  isModal: boolean;
};
 
export function ProductForm({className,product, isModal}: props) {
 const stateCart = useCart(state => state)
 const router = useRouter()
    
const onSubmit = async (productItemId?:number, ingridientsIds?:number[]) => {
      try{
        if (isPizzaForm){
          await stateCart.addCartItem({
            productItemId:productItemId,
            ingridientsIds:ingridientsIds
          })
        }
        else{
          stateCart.addCartItem({
            productItemId:firstItem.id,
          })
    
        }
        toast.success(product.name + " добавлен(a) в корзину")
        if(isModal){
          router.back()
        }
      }
      catch(e){
        toast.error("Не удалось добавить товар в корзину")
        console.log(e)
        
      }
    
      
    }
    
  const firstItem = product.items[0]
  const isPizzaForm =Boolean( firstItem.pizzaType)
  
  if (isPizzaForm){
    return (
      <ChoosePizzaForm 
      items={product.items} 
      name={product.name} 
      ingredients={product.ingredients} 
      imgURL={product.imageURL} 
      onSubmit={onSubmit}
      loading={stateCart.loading}
      />
    )
  }
  return (
    <ChooseProductForm 
    name={product.name} 
    imgURL={product.imageURL} 
    onSubmit={onSubmit} 
    price={firstItem.price}
    loading={stateCart.loading}

    />
    
  )

}