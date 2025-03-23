import { prisma } from "@/prisma/prisma";
import { ChoosePizzaForm } from "@/src/shared/components/shared/choose-pizza-form";
import { ChooseProductForm } from "@/src/shared/components/shared/choose-product-form";
import { Container } from "@/src/shared/components/shared/containter";
import { GroupVariants } from "@/src/shared/components/shared/group-variants";
import { PizzaImage } from "@/src/shared/components/shared/pizza-image";
import { Title } from "@/src/shared/components/shared/title";
import { useCart } from "@/src/shared/store/cart";
import { notFound, useRouter } from "next/navigation";
import toast from "react-hot-toast";



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
     
    </div>
    </Container>
  );
}