import { cn } from "@/lib/utils"

export function Container({children, className}:{children:React.ReactNode,className?:string}) {
  return (
    <div className={cn("mx-auto max-w-[1500px]", className)}>
        {children}
    </div>
  );
}