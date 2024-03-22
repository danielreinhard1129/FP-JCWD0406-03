import type { Metadata } from "next";

import "./globals.css";

import { Footer } from "@/components/Footer";
import Header from "@/components/Header";
import NextTopLoader from "nextjs-toploader";
import StoreProvider from "./StoreProvider";
import { ToastContainer } from "react-toastify";
import "../../../../node_modules/react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "Rumah.123",
  description: "Temukan Penginapan dengan harga terbaik",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-primary">
        <ToastContainer />
        <StoreProvider>
          <NextTopLoader color="#ffffff" showSpinner={false} />
          <Header />
          <main>{children}</main>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
