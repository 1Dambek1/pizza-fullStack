import { prisma } from "@/prisma/prisma";
import { Container } from "@/src/components/shared/containter";
import { GroupVariants } from "@/src/components/shared/group-variants";
import { ProductImage } from "@/src/components/shared/product-image";
import { Title } from "@/src/components/shared/title";
import { notFound } from "next/navigation";

type props = {
  params:{
    id:string
  }
};

export default async function Page({params}: props) {
const {id} = await params
const data = await prisma.product.findUnique({
  where:{
    id:Number(id)
  },
  include:{
    category:true,
    items:true
  }
})
if (!data){
  return notFound()
}
  return (
    <Container className="flex flex-col my-10">\
    <div className="flex flex-1">
      <ProductImage size={40} imageURL={data.imageURL} className="" />
      <div className="w-[490px] bg-[#FCFCFC] p-7">
        <Title text={data.name} size="md" className="font-extrabold mb-1" />
        <p className="text-gray-400">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium autem in voluptates labore earum dignissimos? Deserunt, illo? Cupiditate iste distinctio et? Doloribus obcaecati illo ab excepturi. Sint soluta quam eveniet?</p>
        <GroupVariants variants={[
          {
            name: "Small",
            value: "1",
          },
          {
            name: "Medium",
            value: "2",
          },
          {
            name: "Large",
            value: "3",
          }
        ]} selectedValue={"2"} className="mt-5" />
      </div>
    </div>
    </Container>
  );
}