import "./globals.css";
import { AppContextProvider } from "@/context/AppContext";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata = {
  title: "ShopWhere",
  description: "Shop from anywhere & anytime",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`antialiased text-gray-700`}>
          <Toaster />
          <AppContextProvider>{children}</AppContextProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
