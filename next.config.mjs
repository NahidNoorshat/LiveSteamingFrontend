/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["mcdonalds.yourlile.tech"], // Correct domain name
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

export default nextConfig;
