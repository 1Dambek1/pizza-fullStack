import { Variant } from "@/src/shared/components/shared/group-variants"
import { pizzaSizes } from "@/src/shared/constants/pizza"
import { ProductItem } from "@prisma/client"

export const getAvailablePizza = (pizzaType:number, size:number, items:ProductItem[]):Variant[] => {
      const filteredPizzasByType = items.filter((item) => item.pizzaType === pizzaType)
      const availablePizza = pizzaSizes.map((item) => 
    (  {
        value:item.value,
        name:item.name,
        disabled: !filteredPizzasByType.some((pizza) => Number(pizza.size) === Number(item.value))
      }))
      return availablePizza
    
}
