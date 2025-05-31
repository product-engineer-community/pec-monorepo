/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ["*.productengineer.info", "localhost"],
    },
  },

  reactStrictMode: false,
  transpilePackages: ["@packages/auth"],
  basePath: "/auth",
  assetPrefix: "/auth/",
  webpack: (config) => {
    config.externals = [...config.externals, "canvas", "jsdom"];
    return config;
  },

  async redirects() {
    if (process.env.NODE_ENV === "development") {
      return [
        {
          source: "/",
          destination: "/community/landing",
          basePath: false,
          permanent: false,
        },
      ];
    }
    return [];
  },

  async rewrites() {
    if (process.env.NODE_ENV === "development") {
      return [
        {
          source: "/community/:path*",
          destination: "http://localhost:3001/community/:path*",
          basePath: false,
        },
        {
          source: "/camp/:path*",
          destination: "http://localhost:3002/camp/:path*",
          basePath: false,
        },
        {
          source: "/course/:path*",
          destination: "http://localhost:3003/course/:path*",
          basePath: false,
        },
      ];
    }
    return [];
  },
};
module.exports = nextConfig;
