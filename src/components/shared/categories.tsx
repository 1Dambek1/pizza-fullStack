import { cn } from "@/lib/utils";

const categories = ["Pizza", "Burger", "Pasta", "Sushi", "Salad"];
const activeIndex = 0
export function Categories({className}:{className?:string}) {
  return (
    <div className={cn("inline-flex gap-1 bg-gray-50 p-1 rounded-2xl", className)}>
        {
            categories.map((item,index) => (
                <a 
                key = {index}
                className={cn("flex items-center font-bold  h-11 rounded-2xl px-5",
                    activeIndex === index && "bg-white shadow-md shadow-gray-200 text-primary "
                )}
                >
                    <button>{item}</button>
                </a>
            ))
        }
    </div>
  );
}