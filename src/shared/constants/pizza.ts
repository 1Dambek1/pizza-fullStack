const mapSize = {
    20: "Маленькая",
    30: "Средняя",
    40: "Большая",
} as const

export const mapPizzaType = {
    1: "Тонкое",
    2: "Традиционное",
} as const

export const pizzaSizes = Object.entries(mapSize).map(([value, name]) => ({
    value,
    name,

}))


export const pizzaTypes = Object.entries(mapPizzaType).map(([value, name]) => ({
    value,
    name,

}))

export type PizzaSizeType = keyof typeof mapSize
export type PizzaTypeType = keyof typeof mapPizzaType 
