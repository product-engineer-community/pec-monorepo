/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  transpilePackages: ["@packages/auth"],
  basePath: "/auth",
  assetPrefix: "/auth/",
  webpack: (config) => {
    config.externals = [...config.externals, "canvas", "jsdom"];
    return config;
  },
  async rewrites() {
    if (process.env.NODE_ENV === "development") {
      return [
        {
          source: "/community/:path*",
          destination: "http://localhost:3001/community/:path*",
          basePath: false,
        },
      ];
    }
    return [];
  },
};
module.exports = nextConfig;
