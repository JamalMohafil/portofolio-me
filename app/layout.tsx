import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/react";
// تعريف خط Poppins
const poppins = Poppins({
  weight: ["400", "500", "600", "700"], // الأوزان المختلفة للخط
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Jamal Mohafil Portfolio",
  description:
    "A showcase of Jamal Mohafil's top projects, skills, and experiences.",
  keywords: [
    "Jamal Mohafil",
    "Portfolio",
    "Web Development",
    "Next.js",
    "React",
    "Frontend Developer",
  ],
  creator: "Jamal Mohafil",
  openGraph: {
    title: "Jamal Mohafil Portfolio",
    description: "Explore the top-notch projects and skills of Jamal Mohafil",
    url: "https://jamalmohafil.vercel.app",
    siteName: "Jamal Mohafil Portfolio",
    images: [
      {
        url: "/jamal.jpg", // استبدل بمسار الصورة الخاصة بك
        width: 800,
        height: 600,
        alt: "Jamal Mohafil Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jamal Mohafil Portfolio",
    description:
      "A portfolio showcasing the skills and projects of Jamal Mohafil",
    images: ["/jamal.jpg"], // استبدل بمسار الصورة الخاصة بك
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${poppins.variable}`}>
      <head>
        <meta
          name="google-site-verification"
          content="DPFUmZ6wUk69t-4Xpgo2NhrQV4Iuesk2zlUgghf72UI"
        />
      </head>
      <body
        suppressHydrationWarning
        className={`antialiased dark  ${poppins.className}`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
