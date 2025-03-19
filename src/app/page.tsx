import { Container } from "@/src/components/shared/containter";
import { Filters } from "@/src/components/shared/filters";
import { ProductsGroupList } from "@/src/components/shared/producs-group-list";
import { Title } from "@/src/components/shared/title";
import { TopBar } from "@/src/components/shared/top-bar";
import { api } from "../service/api-client";
export default async function Home() {

  const categories = await api.products.filter()
 
  return (
   <div className="">
    <Container className="mt-12">
      <Title text="Все пиццы" size="lg" className="font-extrabold"/>
    </Container>
    <TopBar categories={categories.filter((category) => category.products.length >0)} />
    <Container className="mt-10 pb-14">
      <div className="flex gap-[70px]">
        <div className="w-[250px]">
          <Filters />
        </div>
        <div className="flex-1">
          <div className="flex flex-col gap-16">
            {categories.map((category) =>(
              category.products.length > 0 && (
                <ProductsGroupList
                title={category.name}
                key={category.id}
                id={category.id}
                products={category.products}
                categoryId={category.id}
                />
              )
            ))}
          


          </div>
        </div>
      </div>
    </Container>

   </div>
  );
}
