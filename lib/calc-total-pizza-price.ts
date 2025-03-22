import { PizzaSizeType, PizzaTypeType } from "@/src/shared/constants/pizza"
import { Ingredient, ProductItem } from "@prisma/client"
/**
 * Функция подсчитывает общую сумму пиццы и ингридиентов
 * @param items  - список вариации
 * @param ingredients - список ингридиентов
 * @param pizzaType - тип выбранной пиццы
 * @param size - размер выбранной пиццы
 * @param selectedIngridients - выбранные ингридиенты
 * @returns  общую сумму пиццы и ингридиентов
 */

export const CalcTotalPizzaPrice = (
    items:ProductItem[],
    ingredients:Ingredient[],
    pizzaType:PizzaTypeType,
    size:PizzaSizeType,
    selectedIngridients:Set<number>
) => {
    
    const pizzaPrice = items.find((item) => item.pizzaType === pizzaType && item.size === size)?.price || 0
    const ingridientsPrice = ingredients.filter((ingredient) => selectedIngridients.has(ingredient.id)).reduce((acc, ingredient) => acc + ingredient.price, 0)
    
    return pizzaPrice +ingridientsPrice
}

