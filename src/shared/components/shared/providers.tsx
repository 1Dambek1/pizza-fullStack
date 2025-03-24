"use client"
import  { Toaster } from 'react-hot-toast';
import { SessionProvider } from "next-auth/react"
import { ReactNode } from 'react';
// import NextTopLoader from 'nextjs-toploader';
type props = {
  children: ReactNode;
};

export function Providers({children}: props) {
  return (
    <>
    <SessionProvider>
            {children}
    </SessionProvider>
    <Toaster/>
    {/* <NextTopLoader /> */}

    </>

  );
}