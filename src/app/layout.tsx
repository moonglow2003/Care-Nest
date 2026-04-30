import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import { Navigation } from "@/components/Navigation";
import { Providers } from "@/components/Providers";
import { ChatAssistant } from "@/components/ChatAssistant";
import "./globals.css";

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Care Nest | Compassionate Clarity",
  description: "A serene, highly legible, and supportive medical management environment.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lexend.variable} h-full antialiased`} style={{ colorScheme: 'light' }}>
      <body className="min-h-full flex flex-col bg-[#f8f9fb] text-[#191c1e] selection:bg-primary-container selection:text-white">
        <Providers>
          <div className="flex-1 flex flex-col w-full max-w-md mx-auto min-h-screen bg-[#ffffff] text-[#191c1e] shadow-2xl overflow-x-hidden relative">
            {children}
            <ChatAssistant />
            <Navigation />
          </div>
        </Providers>
      </body>
    </html>
  );
}
