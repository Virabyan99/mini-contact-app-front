/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['avatars.githubusercontent.com'], // Add the GitHub domain here
  },
  typescript: {
    ignoreBuildErrors: true,
  }
};

module.exports = nextConfig;
