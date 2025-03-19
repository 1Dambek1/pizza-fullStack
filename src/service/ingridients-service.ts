import { Ingredient } from "@prisma/client";
import { INGRIDIENTS_API_URL } from "./constants";

class  Ingridients {
    private url = INGRIDIENTS_API_URL;

    async getIngridients():Promise<Ingredient[]> {
          const url = `${this.url.getIngridients}`
  
          const response = await fetch(url ,{
              method: "GET",
              next: { revalidate: 10000 }
          })
          if(!response.ok){
              throw new Error("Ошибка запроса")
          }
          const data:Ingredient[] = await response.json()
          return data
    }
}

export const ingridientsService = new Ingridients();