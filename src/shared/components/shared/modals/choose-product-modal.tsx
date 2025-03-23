"use client"
import { Dialog, DialogContent, DialogTitle } from "@/src/shared/components/ui/dialog";
import { useRouter } from "next/navigation";
import { ChooseProductForm } from "../choose-product-form";
import { IProduct } from "@/src/shared/@types/prisma-type";
import { ChoosePizzaForm } from "../choose-pizza-form";
import { useCart } from "@/src/shared/store/cart";
import toast from "react-hot-toast";

type props = {
  className?: string;
  product: IProduct;
};

export function ChooseProductModal({
  className,
  product
}: props) {
  const router = useRouter()
  const firstItem = product.items[0]

  const isPizzaForm =Boolean( firstItem.pizzaType)
  
  const stateCart = useCart(state => state)


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
      router.back()
    }
    catch(e){
      toast.error("Не удалось добавить товар в корзину")
      console.log(e)
      
    }

    
  }


  return (
    <Dialog open={Boolean(product)} onOpenChange={()=> router.back()}>
        <DialogContent className="p-0 max-w-[1060px] min-h-[500px] bg-white overflow-hidden">
      <DialogTitle className="hidden"></DialogTitle>
        {
          isPizzaForm ? (
            <ChoosePizzaForm 
            items={product.items} 
            name={product.name} 
            ingredients={product.ingredients} 
            imgURL={product.imageURL} 
            onSubmit={onSubmit}
            loading={stateCart.loading}
            />
          )
          : (
            <ChooseProductForm 
            name={product.name} 
            imgURL={product.imageURL} 
            onSubmit={onSubmit} 
            price={firstItem.price}
            loading={stateCart.loading}

            />
            
          )
        }


        </DialogContent>
    </Dialog>
);
}