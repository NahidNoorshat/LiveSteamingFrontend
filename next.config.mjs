import withCloudflarePages from "@cloudflare/next-on-pages";
/** @type {import('next').NextConfig} */
const nextConfig = withCloudflarePages({
  reactStrictMode: true,
  images: {
    domains: ["127.0.0.1"], // Add your domain here for localhost
  },
  experimental: {
    runtime: "edge", // Necessary for Cloudflare Workers compatibility
    missingSuspenseWithCSRBailout: false,
  },
});

export default nextConfig;
