/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["www.freepnglogos.com"],
    loader: "akamai",
    path: "",
  },
};

module.exports = nextConfig;
