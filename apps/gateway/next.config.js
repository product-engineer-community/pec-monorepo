/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ["*.productengineer.info", "localhost"],
    },
  },

  standalone: true,
};
module.exports = nextConfig;
