import { cn } from "@/lib/utils";
import { PizzaImage } from "./pizza-image";
import { Title } from "./title";
import { Button } from "../ui/button";
import { GroupVariants } from "./group-variants";
import { PizzaSizeType, PizzaTypeType, pizzaTypes } from "../../constants/pizza"; 
import { Ingredient, ProductItem } from "@prisma/client";
import { IngridientView } from "./ingridient";
import { usePizzaOptions } from "../../hooks/use-active-availble-size";
import { getPizzaDetails } from "@/lib/get-pizza-details";

type props = {
    imgURL:string;
    name:string;
    ingredients:Ingredient[];
    items:ProductItem[];
    className?: string;
    loading:boolean;
    onSubmit:(itemId:number,ingridientsIds:number[])=>void;
};

export function ChoosePizzaForm({
  className,
  imgURL,
  name,
  ingredients,
  loading,
  items,
  onSubmit
}: props) {

  const {pizzaType, size, setPizzaType, setSize, selectedIngridients, addIngridient, availablePizza, currentItemId} = usePizzaOptions(items)

  const {totalPrice, textDetails} = getPizzaDetails(items, ingredients, pizzaType, size, selectedIngridients)

  const handleClickAddToCart = () => {
    if (currentItemId){
      onSubmit(currentItemId,Array.from(selectedIngridients))
    }

  }

  return (
    <div className={cn('flex flex-1',className)}>
        <PizzaImage imageURL={imgURL} size={size} />

        <div className="w-[490px] bg-[#f7f6f5] p-7">
            <Title text={name} size="md" className="font-extrabold mb-1" />
            <p className="text-gray-400"> {textDetails}</p>
            <div className="flex flex-col mt-5 gap-5">
              <GroupVariants
              variants= {availablePizza}
              selectedValue={String(size)}
              onChange = { value => setSize(Number(value) as PizzaSizeType)}
              />
              <GroupVariants
              variants= {pizzaTypes}
              selectedValue={String(pizzaType)}
              onChange = { value => setPizzaType(Number(value) as PizzaTypeType)}
              />
            </div>
        <div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-4">
  
              <div className="grid grid-cols-3 gap-3">
                {ingredients.map((ingredient) =>(
                  <IngridientView
                  key={ingredient.id}
                  name={ingredient.name}
                  price={ingredient.price}
                  imgUrl={ingredient.imageURL}
                  onClick={()=>addIngridient(ingredient.id)}
                  active={selectedIngridients.has(ingredient.id)}
                  />
                ))}
              </div>
        </div>
            <Button
            loading={loading}
            onClick={handleClickAddToCart}
            className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
                Добавить в корзину за {totalPrice} руб.
            </Button>
        </div>

    </div>
  );
}