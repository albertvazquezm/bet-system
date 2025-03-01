import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import { Providers } from "./providers";
import { Toaster } from "sonner";
import ErrorBoundaryWrapper from "@/components/util/error-boundary-wrapper";

export const metadata: Metadata = {
  title: "Sports Betting System",
  description: "Sports Betting System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <div className="flex flex-col h-screen">
          <ErrorBoundaryWrapper>
            <Providers>
              <Header />
              <main className="flex-1 overflow-y-auto">
                <div className="max-w-7xl mx-auto px-4 py-6">
                  {children}
                </div>
                <Toaster />
              </main>
            </Providers>
          </ErrorBoundaryWrapper>
        </div>
      </body>
    </html>
  );
}
