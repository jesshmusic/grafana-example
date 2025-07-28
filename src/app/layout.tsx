import type { Metadata } from "next";
import { Fira_Code, Josefin_Sans } from "next/font/google";
import "./globals.css";
import ApolloWrapper from "@/components/ApolloWrapper";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-josefin",
});

const geistMono = Fira_Code({
  variable: "--font-firacode",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Visualization Examples",
  description: "Various examples of visualizations using Grafana data sources and Plotly.js",
};

export default function RootLayout({ children }: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${josefinSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col relative`}>
        <ApolloWrapper>
          <Header />
          <Navbar />
          <main className="relative z-10 p-4 flex-grow">
            {children}
          </main>
          <Footer />
        </ApolloWrapper>
      </body>
    </html>
  );
}

