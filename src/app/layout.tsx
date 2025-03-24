import { Nunito } from "next/font/google";
import "./globals.css";
import  { Toaster } from 'react-hot-toast';

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["cyrillic"],
  weight: ["400", "500", "600", "700", "800", "900"],
})
  

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <head>
            <link rel="shortcut icon" href="/logo.png" type="image/x-icon" />
        </head>
      <body
        className={`${nunito.variable} antialiased`}
      > 
        {children}
    <Toaster/>

      </body>
    </html>
  );
}
