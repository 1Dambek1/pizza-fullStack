const API_URL = process.env.NEXT_PUBLIC_API_URL;

const PRODUCTS_PREFIX = "/products"
export const PRODUCTS_API_URL = {
    search: `${API_URL}${PRODUCTS_PREFIX}/search`,
    filter: `${API_URL}${PRODUCTS_PREFIX}/filter`
}
const INGRIDIENTS_PREFIX = "/ingridients"
export const INGRIDIENTS_API_URL = {
    getIngridients: `${API_URL}${INGRIDIENTS_PREFIX}`
}

const CART_PREFIX = "/cart"
export const CART_API_URL = {
    Cart: `${API_URL}${CART_PREFIX}`
}
