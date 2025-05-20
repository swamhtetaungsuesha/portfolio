import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["100", "300", "400", "500", "700", "900"],
  display: "swap",
});
export const metadata: Metadata = {
  title: "Swam Htet Aung - Frontend Developer",
  description: "This is a porfolio of zylem.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.className}>
      <body className={`${roboto.className} antialiased font-roboto`}>
        {/* <Layout>{children}</Layout> */}
        {children}
        <Toaster />
      </body>
    </html>
  );
}
