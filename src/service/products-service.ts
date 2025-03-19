import { Category, Product } from "@prisma/client";
import { PRODUCTS_API_URL } from "./constants";


class Products {
    private url = PRODUCTS_API_URL;

    async search(query:string):Promise<Product[]> {
        const url = `${this.url.search}?query=${query}`

        const response = await fetch(url ,{
            method: "GET",
        })
        if(!response.ok){
            console.log(response)
    }
        const data:Product[] = await response.json()
        return data
  }

  async filter():Promise<Category[]>  {
    const url = `${this.url.filter}`

    const response = await fetch(url ,{
        method: "GET",
    })
    if(!response.ok){
        console.log(response)
        // throw new Error("Ошибка запроса")
    }
    const data:Category[] = await response.json()
    return data
}


}
export const productsService = new Products();
