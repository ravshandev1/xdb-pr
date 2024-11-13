"use client";

import { Inter } from "next/font/google";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "@/contexts/AuthContext";

import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { DateProvider } from "@/contexts/DateContext";
import { SearchProvider } from "@/contexts/SearchContext";

const inter = Inter({ subsets: ["latin"] });

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>XDB</title>
      </head>
      <body className={inter.className}>
        <ChakraProvider>
          <AuthProvider>
            <DateProvider>
              <SearchProvider>
                <QueryClientProvider client={queryClient}>
                  <ToastContainer />
                  {children}
                </QueryClientProvider>
              </SearchProvider>
            </DateProvider>
          </AuthProvider>
        </ChakraProvider>
      </body>
    </html>
  );
}
