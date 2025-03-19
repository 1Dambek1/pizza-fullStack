import { Product } from "@prisma/client";
import { API_URL } from "./api-client";


class Products {
    private url: string = API_URL + "/products";

    async search(query:string):Promise<Product[]> {
        const response = await fetch(`${this.url}/search?query=${query}` ,{
            method: "GET",
        })
        if(!response.ok){
            throw new Error("Ошибка запроса")
        }
        const data:Product[] = await response.json()
        return data
  }
}
export const productsService = new Products();
