import { CART_API_URL } from "./constants";
import { CartDTO, CreateCartItemValues } from "@/src/dto/cart.dto";

class  CartApi{
  private url: string = CART_API_URL.Cart
  async getCart():Promise<CartDTO> {
    const response = await fetch(this.url,{
      method: "GET",
      credentials: "include"
    })
    if(!response.ok){
      throw new Error("Ошибка запроса")
    }
    const data:CartDTO = await response.json()
    return data
  }

  async updateItemQuantity(id:number,quantity:number):Promise<CartDTO> {
    const response = await fetch(`${this.url}/${id}`,{
      method: "PATCH",
      credentials: "include",
      body:JSON.stringify({quantity:quantity})
    })
    if(!response.ok){
      throw new Error("Ошибка запроса")
    }
    const data:CartDTO = await response.json()
    return data
  }

  async removeCartItem(id:number):Promise<CartDTO> {
    const response = await fetch(`${this.url}/${id}`,{
      method: "DELETE",
      credentials: "include"
    })
    if(!response.ok){
      throw new Error("Ошибка запроса")
    }
    const data:CartDTO = await response.json()
    return data
  }
  async addCartItem(values:CreateCartItemValues):Promise<CartDTO> {
    const response = await fetch(`${this.url}`,{
      method: "POST",
      credentials: "include",
      body:JSON.stringify(values)
    })
    if(!response.ok){
      throw new Error("Ошибка запроса")
    }
    const data:CartDTO = await response.json()
    return data
}
}
export const cart = new CartApi();