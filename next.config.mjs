import { hostname } from "os";

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // السماح بكل النطاقات
      },
    ],
  },
  experimental: {
    // أضف إعدادات تجريبية إذا كنت بحاجة إليها
  },
};

export default nextConfig;
