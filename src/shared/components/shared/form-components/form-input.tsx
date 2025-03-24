import { cn } from "@/lib/utils";
import { Input } from "../../ui/input";
import { ErrorText } from "../error-text";
import { InputHTMLAttributes } from "react";
import { ClearButton } from "../clear-button";
import { useFormContext } from "react-hook-form";

interface props extends InputHTMLAttributes<HTMLInputElement> {
    name:string;
    required?:boolean;
    label?:string;
  className?: string;
};

export function FormInput({label, required, className, name, ...props}: props) {
  const {register, formState:{errors}, watch, setValue} = useFormContext()
  const value = watch(name)
  const error = errors[name]?.message as string
  const onClick = () =>{
    setValue(name, "")
  }
  return (
    <div className={cn('',className)}>
        {label &&(
            <p className="font-medium mb-2">
                {label} {required && <span className="text-red-500">*</span>}
            </p>
        ) 

        }
        <div className="relative">
            <Input className="h-12 text-md" {...props} {...register(name)} />
            {value && <ClearButton onClick={onClick} />}

        </div>
        { error && <ErrorText text="Поле обязательно" className="mb-2" />}
    </div>
  );
}