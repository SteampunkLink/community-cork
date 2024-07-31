import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/assets/styles/global.css";
import Providers from "./providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
            backgroundImage:
              "linear-gradient(140deg, rgba(5,5,113,1) 68%, rgba(31,209,245,1) 85%);",
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
          }}
        >
          <Navbar />
          <div className="md:container mx-auto px-6 md:px-12 min-h-[85vh]">
            {children}
          </div>
          <Footer />
        </body>
      </html>
    </Providers>
  );
}
