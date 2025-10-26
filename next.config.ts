import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // rewrites: async () => {
  //   return[
  //     {

  //     }
  //   ]
  // },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com"
      }
    ],
  },
};

export default nextConfig;
