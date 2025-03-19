import { Product } from "@prisma/client";
import { PRODUCTS_API_URL } from "./constants";


class Products {
    private url = PRODUCTS_API_URL;

    async search(query:string):Promise<Product[]> {
        const url = `${this.url.search}?query=${query}`

        const response = await fetch(url ,{
            method: "GET",
            next: { revalidate: 0 }
        })
        if(!response.ok){
            throw new Error("Ошибка запроса")
        }
        const data:Product[] = await response.json()
        return data
  }
}
export const productsService = new Products();
