"use client"
import { Dialog, DialogContent, DialogTitle } from "@/src/shared/components/ui/dialog";
import { Product } from "@prisma/client";
import { useRouter } from "next/navigation";
import { ChooseProductForm } from "../choose-product-form";
import { IProduct } from "@/src/shared/@types/prisma-type";
import { ChoosePizzaForm } from "../choose-pizza-form";

type props = {
  className?: string;
  product: IProduct;
};

export function ChooseProductModal({
  className,
  product
}: props) {
  const router = useRouter()
  const isPizzaForm =Boolean( product.items[0].pizzaType)
  return (
    <Dialog open={Boolean(product)} onOpenChange={()=> router.back()}>
        <DialogContent className="p-0 max-w-[1060px] min-h-[500px] bg-white overflow-hidden">

        {
          isPizzaForm ? (
            <ChoosePizzaForm 
            items={product.items} 
            name={product.name} 
            ingredients={product.ingredients} 
            imgURL={product.imageURL} 
            onclickAddToCart={()=>router.push(`/product/${product.id}`)} />
          )
          : (
            <ChooseProductForm 
            name={product.name} 
            imgURL={product.imageURL} 
            onclickAddToCart={()=>router.push(`/product/${product.id}`)} />
          )
        }


        </DialogContent>
    </Dialog>
);
}