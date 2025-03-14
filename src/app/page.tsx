import { Container } from "@/components/shared/containter";
import { Title } from "@/components/shared/title";
import { TopBar } from "@/components/shared/top-bar";

export default function Home() {
  return (
   <div className="">
    <Container className="mt-12">
      <Title text="Все пиццы" size="lg" className="font-extrabold"/>
    </Container>
    <TopBar/>

   </div>
  );
}
