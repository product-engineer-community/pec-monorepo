// apps/gateway/next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  async redirects() {
    return [
      {
        source: "/",
        destination: "https://productengineer.info",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
