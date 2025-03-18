import { Container } from "@/src/components/shared/containter";
import { Filters } from "@/src/components/shared/filters";
import { ProductsGroupList } from "@/src/components/shared/producs-group-list";
import { Title } from "@/src/components/shared/title";
import { TopBar } from "@/src/components/shared/top-bar";

export default function Home() {
  return (
   <div className="">
    <Container className="mt-12">
      <Title text="Все пиццы" size="lg" className="font-extrabold"/>
    </Container>
    <TopBar/>
    <Container className="mt-10 pb-14">
      <div className="flex gap-[70px]">
        <div className="w-[250px]">
          <Filters />
        </div>
        <div className="flex-1">
          <div className="flex flex-col gap-16">
          <ProductsGroupList title="Все пиццы" id={1} products={[
              {
                id: 1,
                name: "Цыпленка с овощами, сыром, молоком и т.д.",
                items: [{price:100}],
                imageURL: "https://media.dodostatic.net/image/r:292x292/019591c6455276a4bb8ab7745efd46c1.avif"
              },
              {
                id: 2,
                name: "Цыпленка с овощами, сыром, молоком и т.д.",
                items: [{price:100}],
                imageURL: "https://media.dodostatic.net/image/r:292x292/019591c6455276a4bb8ab7745efd46c1.avif"
              },
              {
                id: 3,
                name: "Цыпленка с овощами, сыром, молоком и т.д.",
                items: [{price:100}],
                imageURL: "https://media.dodostatic.net/image/r:292x292/019591c6455276a4bb8ab7745efd46c1.avif"
              },
              {
                id: 4,
                name: "Цыпленка с овощами, сыром, молоком и т.д.",
                items: [{price:100}],
                imageURL: "https://media.dodostatic.net/image/r:292x292/019591c6455276a4bb8ab7745efd46c1.avif"
              },
              {
                id: 5,
                name: "Цыпленка с овощами, сыром, молоком и т.д.",
                items: [{price:100}],
                imageURL: "https://media.dodostatic.net/image/r:292x292/019591c6455276a4bb8ab7745efd46c1.avif"
              },
              {
                id: 6,
                name: "Цыпленка с овощами, сыром, молоком и т.д.",
                items: [{price:100}],
                imageURL: "https://media.dodostatic.net/image/r:292x292/019591c6455276a4bb8ab7745efd46c1.avif"
              },
              
            ]} categoryId={1} />


<ProductsGroupList title="Все комбо"  id={2} products={[
              {
                id: 1,
                name: "Цыпленка с овощами, сыром, молоком и т.д.",
                items: [{price:100}],
                imageURL: "https://media.dodostatic.net/image/r:292x292/019591c6455276a4bb8ab7745efd46c1.avif"
              },
              {
                id: 2,
                name: "Цыпленка с овощами, сыром, молоком и т.д.",
                items: [{price:100}],
                imageURL: "https://media.dodostatic.net/image/r:292x292/019591c6455276a4bb8ab7745efd46c1.avif"
              },
              {
                id: 3,
                name: "Цыпленка с овощами, сыром, молоком и т.д.",
                items: [{price:100}],
                imageURL: "https://media.dodostatic.net/image/r:292x292/019591c6455276a4bb8ab7745efd46c1.avif"
              },
              {
                id: 4,
                name: "Цыпленка с овощами, сыром, молоком и т.д.",
                items: [{price:100}],
                imageURL: "https://media.dodostatic.net/image/r:292x292/019591c6455276a4bb8ab7745efd46c1.avif"
              },
              {
                id: 5,
                name: "Цыпленка с овощами, сыром, молоком и т.д.",
                items: [{price:100}],
                imageURL: "https://media.dodostatic.net/image/r:292x292/019591c6455276a4bb8ab7745efd46c1.avif"
              },
              {
                id: 6,
                name: "Цыпленка с овощами, сыром, молоком и т.д.",
                items: [{price:100}],
                imageURL: "https://media.dodostatic.net/image/r:292x292/019591c6455276a4bb8ab7745efd46c1.avif"
              },
            ]} categoryId={2} />
          </div>
        </div>
      </div>
    </Container>

   </div>
  );
}
