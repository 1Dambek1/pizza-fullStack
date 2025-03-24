"use client"
import { Dialog, DialogContent, DialogTitle } from "@/src/shared/components/ui/dialog";
import { useRouter } from "next/navigation";
import { IProduct } from "@/src/shared/@types/prisma-type";
import { ProductForm } from "../product-form";

type props = {
  className?: string;
  product: IProduct;
};

export function ChooseProductModal({
  className,
  product
}: props) {
  const router = useRouter()




  return (
    <Dialog open={Boolean(product)} onOpenChange={()=> router.back()}>
        <DialogContent className="p-0 max-w-[1060px] min-h-[500px] bg-white overflow-hidden">
      <DialogTitle className="hidden"></DialogTitle>
           <ProductForm product={product} isModal={true} />
       


        </DialogContent>
    </Dialog>
);
}