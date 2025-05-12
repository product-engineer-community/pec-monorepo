/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  transpilePackages: ["@packages/auth"],
  webpack: (config) => {
    config.externals = [...config.externals, "canvas", "jsdom"];
    return config;
  },
};

module.exports = nextConfig;
