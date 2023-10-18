/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    domains: ["ui-avatars.com", "localhost", "res.cloudinary.com", "asset.cloudinary.com"],
  },
}

module.exports = nextConfig
