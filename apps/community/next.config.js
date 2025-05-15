2;
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ["*.productengineer.info", "localhost"],
    },
  },

  reactStrictMode: false,
  transpilePackages: ["@packages/auth"],
  basePath: "/community",
  assetPrefix: "/community/",
  webpack: (config) => {
    config.externals = [...config.externals, "canvas", "jsdom"];
    return config;
  },

  async rewrites() {
    if (process.env.NODE_ENV === "development") {
      return [
        {
          source: "/auth/:path*",
          destination: "http://localhost:3000/auth/:path*",
          basePath: false,
        },
        {
          source: "/camp/:path*",
          destination: "http://localhost:3002/camp/:path*",
          basePath: false,
        },
      ];
    }
    return [];
  },
};

module.exports = nextConfig;
