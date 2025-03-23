import { Container } from "@/src/shared/components/shared/containter";
import { Filters } from "@/src/shared/components/shared/filters";
import { ProductsGroupList } from "@/src/shared/components/shared/producs-group-list";
import { Title } from "@/src/shared/components/shared/title";
import { TopBar } from "@/src/shared/components/shared/top-bar";
import { Suspense } from "react";
import { findPizzas, GetSearchParams } from "@/lib/find-pizzas";

export default async function Home({searchParams}:{searchParams:Promise<GetSearchParams>}) {
 
  const categories = await findPizzas((await searchParams))
  
 
  return (
   <div className="">
    <Container className="mt-12">
      <Title text="Все пиццы" size="lg" className="font-extrabold"/>
    </Container>
    <TopBar categories={categories.filter((category) => category.products.length >0)} />
    <Container className="mt-10 pb-14">
      <div className="flex gap-[70px]">
        <div className="w-[250px]">
          <Suspense fallback={(<div>Loading...</div>)}>
          <Filters />
          </Suspense>
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
            ))
          
          }
          


          </div>
        </div>
      </div>
    </Container>

   </div>
  );
}
