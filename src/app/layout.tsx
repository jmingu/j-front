import type { Metadata } from "next";
import { Inter, Noto_Sans_KR  } from "next/font/google";
import "./globals.css";
import Navber from "@/components/navber";


const inter = Inter({ subsets: ["latin"] });
const notoSansKr = Noto_Sans_KR({
  weight: ['500'],
  subsets: ['latin'],
});


export const metadata: Metadata = {
  title: "PROJECT-J",
  description: "PROJECT-J APP",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`sm:max-w-4xl sm:m-auto ${notoSansKr.className}`}>
          <Navber />
        <div className="mt-4 sm:mt-10 px-5">
          {children}
        </div>
        
      </body>
    </html>
  );
}
