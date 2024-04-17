import { Inter } from "next/font/google";
import { ChakraProvider } from '@chakra-ui/react'
import './globals.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Kanban Board",
  description: "Mangae your tasks",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ChakraProvider>
      <body className={inter.className}>{children}</body>
      </ChakraProvider>
    </html>
  );
}
