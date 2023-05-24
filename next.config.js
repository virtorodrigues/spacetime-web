/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'avatars.githubusercontent.com',
      'localhost',
      'storage.googleapis.com',
      'spacetime-web-seven.vercel.app',
      'spacetime-bucket.s3.amazonaws.com',
    ],
  },
}

module.exports = nextConfig
