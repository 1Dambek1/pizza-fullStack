import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

type props = {
  className?: string;
};

export function SearchInput({className}: props) {
  return (
    <div className={cn('flex rounded-2xl flex-1 justify-between relative h-11',className)}> 
        <Search className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400" />
        <in
    </div>
  );
}