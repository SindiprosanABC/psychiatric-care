import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Permite todos os domínios HTTPS
      },
    ],
  },
};

export default nextConfig;
