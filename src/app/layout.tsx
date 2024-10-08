import type { Metadata } from "next";
import "./globals.css";
import Header from "@/Components/Header";
import { UserProvider } from "@/utils/contexts";
import LogInWrapper from "@/Components/LogInWrapper";

export const metadata: Metadata = {
  title: "The Food Booth",
  description: "Your everyday savior when inspiration is lacking!",
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
        <Header />
        <UserProvider>
          <LogInWrapper children={children} />
        </UserProvider>
      </body>
    </html>
  );
}
