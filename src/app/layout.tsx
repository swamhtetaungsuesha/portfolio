import type { Metadata } from "next";
import { Sora } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
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
    <html lang="en" className={sora.className}>
      <body className={`${sora.className} antialiased font-sora`}>
        {/* <Layout>{children}</Layout> */}
        {children}
        <Toaster />
      </body>
    </html>
  );
}
