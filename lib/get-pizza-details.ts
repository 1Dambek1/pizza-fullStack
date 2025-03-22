import { Ingredient, ProductItem } from "@prisma/client"
import { CalcTotalPizzaPrice } from "./calc-total-pizza-price"
import { mapPizzaType, PizzaSizeType, PizzaTypeType } from "@/src/shared/constants/pizza"

export const getPizzaDetails = (
        items:ProductItem[],
        ingredients:Ingredient[],
        pizzaType:PizzaTypeType,
        size:PizzaSizeType,
        selectedIngridients:Set<number>
) => {
    const totalPrice = CalcTotalPizzaPrice(
        items,
        ingredients,
        pizzaType,
        size,
        selectedIngridients
      )
      const textDetails = `${size} см, ${mapPizzaType[pizzaType] } тесто`
      return {totalPrice, textDetails}
}