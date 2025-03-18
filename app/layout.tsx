import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import ChatbotWidget from "@/components/Asisstant";
// تعريف خط Poppins
const poppins = Poppins({
  weight: ["400", "500", "600", "700"], // الأوزان المختلفة للخط
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Jamal Mohafil | Full Stack Developer",
  applicationName: "Jamal Mohafil Portfolio",
  description:
    "Jamal Mohafil is a skilled Next.js and React developer specializing in building high-performance web applications. Explore his top projects, skills, and experience.",
  keywords: [
    "Jamal Mohafil",
    "Portfolio",
    "Web Developer",
    "Full Stack Developer",
    "Next.js",
    "React",
    "JavaScript",
    "TypeScript",
    "Software Engineer",
  ],
  openGraph: {
    title: "Jamal Mohafil Portfolio",
    description:
      "Explore Jamal Mohafil's top-notch projects, technical skills, and experiences in web development.",
    url: "https://jamalmohafil.vercel.app",
    siteName: "Jamal Mohafil Portfolio",
    images: [
      {
        url: "https://jamalmohafil.vercel.app/jamal.jpg", // استخدم رابطًا كاملاً بدل المسار النسبي
        width: 1200,
        height: 630,
        alt: "Jamal Mohafil Portfolio",
      },
    ],  
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jamal Mohafil | Full Stack Developer",
    description:
      "Discover the skills and projects of Jamal Mohafil, an expert in Next.js, React, and full-stack development.",
    images: ["https://jamalmohafil.vercel.app/jamal.jpg"],
  },
  alternates: {
    canonical: "https://jamalmohafil.vercel.app",
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
        <ChatbotWidget />
        <Analytics />
      </body>
    </html>
  );
}
