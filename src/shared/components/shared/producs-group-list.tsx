"use client";
import { cn } from "@/lib/utils";
import { Title } from "./title";
import { ProductCard } from "@/src/shared/components/shared/prodcut-card";
import {  useEffect, useRef } from "react";
import {useIntersection} from "react-use"
import { useCategory } from "@/src/shared/store/category";
import { IProduct } from "../../@types/prisma-type";
// TODO переделать

interface Props {
    id:number;
    title:string;

    products: IProduct[];
    
    categoryId:number;

    listClassName?: string;
    className?: string;
};

export function ProductsGroupList({ title, products, categoryId, listClassName, className }: Props) {
    const setActiveId = useCategory((state) => state.setActiveId);
    const intersectionRef:any = useRef(null)
    const intersection = useIntersection(intersectionRef,{
        threshold: 0.4,
    })
    useEffect(() => {
        if (intersection?.isIntersecting) {
            setActiveId(categoryId);
        }
    }, [intersection, intersection?.isIntersecting, title,categoryId, setActiveId]);
    return (
    <div id={title} ref = {intersectionRef} className={cn("mb-20",className)}>

        <Title text={title} size="lg" className="font-extrabold mb-10"/>
        <div className={cn("grid grid-cols-3 gap-[50px]",listClassName)}>
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    price={product.items[0].price}
                    imageURL={product.imageURL}
                    ingridients= {product.ingredients}
                    />
            ))}

        </div>
    </div>
  );
}
