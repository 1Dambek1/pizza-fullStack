import { Cart, CartItem, Ingredient, Product, ProductItem } from "@prisma/client";

export type CartItemDTO = CartItem & {
    productItem: ProductItem & {
        product: Product
    };
    ingridients: Ingredient[]
}

export interface CartDTO extends Cart{
    cartItems: CartItemDTO[]
}

export interface CreateCartItemValues {
    productItemId:number
    ingridientsIds?:number[]
}