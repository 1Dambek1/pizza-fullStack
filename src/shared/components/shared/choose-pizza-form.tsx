import { cn } from "@/lib/utils";
import { PizzaImage } from "./pizza-image";
import { Title } from "./title";
import { Button } from "../ui/button";
import { useState } from "react";
import { GroupVariants } from "./group-variants";
import { PizzaSizeType, pizzaSizes, PizzaTypeType, pizzaTypes, mapPizzaType } from "../../constants/pizza"; 
import { Ingredient, ProductItem } from "@prisma/client";
import { IngridientView } from "./ingridient";
import { useSet } from "react-use";

type props = {
    imgURL:string;
    name:string;
    ingredients:Ingredient[];
    items:ProductItem[];
    onclickAddToCart:VoidFunction;
    className?: string;
};

export function ChoosePizzaForm({
  className,
  imgURL,
  name,
  ingredients,
  items,
  onclickAddToCart
}: props) {

  const [pizzaType, setPizzaType] = useState<PizzaTypeType>(1)
  const [size, setSize] = useState<PizzaSizeType>(20)

  const [selectedIngridients, {toggle:addIngridient}] = useSet(new Set<number>([]))

  const pizzaPrice = items.find((item) => item.pizzaType === pizzaType && item.size === size)?.price || 0
  const ingridientsPrice = ingredients.filter((ingredient) => selectedIngridients.has(ingredient.id)).reduce((acc, ingredient) => acc + ingredient.price, 0)
  
  const totalPrice = pizzaPrice +ingridientsPrice

  const handleClickAddToCart = () => {
    onclickAddToCart()
    console.log({
      size,
      pizzaType,
      selectedIngridients,

    })
  }
  const textDetails = `${size} см, ${mapPizzaType[pizzaType] } тесто`


  const availablePizzas = items.filter((item) => item.pizzaType === pizzaType)
  const availablePizzaSize = pizzaSizes.map((item) => 
(  {
    value:item.value,
    name:item.name,
    disabled: !availablePizzas.some((pizza) => Number(pizza.size) === Number(item.value))
  }))


  return (
    <div className={cn('flex flex-1',className)}>
        <PizzaImage imageURL={imgURL} size={size} />

        <div className="w-[490px] bg-[#f7f6f5] p-7">
            <Title text={name} size="md" className="font-extrabold mb-1" />
            <p className="text-gray-400"> {textDetails}</p>
            <div className="flex flex-col mt-5 gap-5">
              <GroupVariants
              variants= {availablePizzaSize}
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
            onClick={handleClickAddToCart}
            className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
                Добавить в корзину за {totalPrice} руб.
            </Button>
        </div>

    </div>
  );
}