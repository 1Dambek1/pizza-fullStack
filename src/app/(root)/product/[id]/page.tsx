import { prisma } from "@/prisma/prisma";
import { Container } from "@/src/shared/components/shared/containter";
import { ProductForm } from "@/src/shared/components/shared/product-form";
import { notFound } from "next/navigation";



export default async function Page({params}: {params:Promise<{id:string}>}) {
const {id} = await params

const product = await prisma.product.findUnique({
  where:{
    id:Number(id)
  },
  include:{
    items:true,
    category:{
      include:{
        products:{
          include:{
            items:true
          }
        }
      }
    },
    ingredients:true
  }
})
if (!product){
  return notFound()
}


  return (
    <Container className="flex flex-col my-10">
    <div className="flex flex-1">
    <ProductForm product={product} isModal={false} />
    </div>
    </Container>
  );
}