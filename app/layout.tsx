import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/assets/styles/global.css";
import Providers from "./providers";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CommunityCork | A More Responsible Social Media Site",
  description: "A More Responsible Social Media Site",
  keywords: "social media, posts, friends",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en">
        <body
          className={inter.className}
          style={{
            background: "green",
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
          }}
        >
          <Navbar />
          <div className="container mx-auto px-12">{children}</div>
        </body>
      </html>
    </Providers>
  );
}
