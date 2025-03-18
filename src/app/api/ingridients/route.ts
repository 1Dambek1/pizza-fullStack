import { prisma } from "@/prisma/prisma";
import { NextResponse } from "next/server";

export async function GET(){
    const ing = await prisma.ingredient.findMany();
    return NextResponse.json(ing)
}