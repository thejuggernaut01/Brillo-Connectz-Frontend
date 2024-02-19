import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/context/UserContext";

const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const metadata: Metadata = {
  title: "Full stack assessment test",
  description: "Built by Ayoola Adewale",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} w-[90%] mx-auto lg:w-[80%] xl:w-[85%] 2xl:w-[65%]`}
      >
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
