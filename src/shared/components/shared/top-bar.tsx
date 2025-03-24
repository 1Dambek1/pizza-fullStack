"use client"

import { cn } from "@/lib/utils";
import { Categories } from "./categories";
import { SortPopup } from "@/src/shared/components/shared/sort-popup";
import { Container } from "./containter";
import { Category } from "@prisma/client";

type props = {
  className?: string;
  categories:Category[]
};

export function TopBar({className, categories}: props) {
  return (
    <div className={cn(' top-0 left-0  sticky z-30 opacity-100 w-full h-full  bg-white shadow-lg shadow-gray-200 py-5 px-5 rounded-2xl', className)}>
      <Container className="flex  justify-between items-center">
          <Categories items={categories} />
          <SortPopup/>
      </Container>
    </div>
  );
}