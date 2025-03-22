"use client"
import { cn } from "@/lib/utils";

type Variant = {
    name: string;
    value: string;
    disabled?: boolean;
}

type props = {
    variants: readonly Variant[];
    className?: string;
    onChange?: (value: Variant['value']) => void;
    selectedValue?: Variant['value'];
};

export function GroupVariants({
    variants,
    className,
    onChange,
    selectedValue,
}: props) {
  return (
    <div className={cn('flex justify-between  bg-[#F3F3F7] rounde-3xl p-1 select-none',className)}>
        {
            variants.map((variant) => (
                <button 
                key={variant.name} 
                onClick={()=> onChange?.(variant.value)}
                className={cn("flex items-center justify-center cursor-pointer h-[30px] px-5 flex-1 rounded-3xl transition-all duration-400 text-sm",
                    {
                        "bg-white shadow" : variant.value === selectedValue,
                        "to-gray-500 opacity-50  pointer-events-none": variant.disabled,
                    }
                )}
                >
                    {variant.name}
                </button>
            )
        )
        }
    </div>
  );
}