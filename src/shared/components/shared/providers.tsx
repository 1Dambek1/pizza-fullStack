"use client"
import { ReactNode } from 'react';
// import NextTopLoader from 'nextjs-toploader';
type props = {
  children: ReactNode;
};

export function Providers({children}: props) {
  return (
    <>
    {children}
    {/* <NextTopLoader /> */}

    </>

  );
}