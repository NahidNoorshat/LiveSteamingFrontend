/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["91.219.237.46"], // Correct domain name
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

export default nextConfig;
