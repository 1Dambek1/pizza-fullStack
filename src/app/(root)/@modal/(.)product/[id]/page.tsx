import { prisma } from "@/prisma/prisma";
import { ChooseProductModal } from "@/src/shared/components/shared/modals/choose-product-modal";
import { notFound } from "next/navigation";


export default async function Page({params}: {params:Promise<{id:string}>}) { 
const {id} = await params
const data = await prisma.product.findUnique({
  where:{
    id:Number(id)
  },

  include:{
    ingredients:true,
    items:true,
  }
})
if (!data){
  return notFound()
}
  return (
    <ChooseProductModal product={data} />
  );
}