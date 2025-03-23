import { mapPizzaType, PizzaSizeType, PizzaTypeType } from "@/src/shared/constants/pizza";
import { CartStateItem } from "./get-cart-details";

export const getCartItemsDetails =  (
    pizzaType:PizzaTypeType | null,
    pizzaSize:PizzaSizeType | null ,
    ingridients : CartStateItem["ingredients"]
) => {
      const details = []
      if (pizzaSize && pizzaType) {
        const typeName = mapPizzaType[pizzaType]
        details.push(`${typeName} ${pizzaSize} см`)}
      
      if (ingridients) {
        details.push(...ingridients.map((ingridient) => ingridient.name))
      }
      return details.join(', ')
}