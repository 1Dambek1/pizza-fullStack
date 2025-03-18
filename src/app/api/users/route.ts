import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma";

export async function GET(){
    const users = await prisma.user.findMany() 
    return NextResponse.json({message:users});
}


export async function POST(request:NextRequest) {
    const body = await request.json();
    const user = await prisma.user.create({data:body})
    return NextResponse.json({message:user});
}