/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/** @type {import('next').NextConfig} */
const nextConfig = {
  headers() {
    return [
      {
        source: "/:path",
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAME",
          },
        ],
      },
      {
        source: "/frame/",
        headers: [
          {
            key: "X-Frame-Options",
            value: "*",
          },
        ],
      },
    ];
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      exclude: /node_modules/,
      use: {
        loader: "svg-react-loader",
      },
    });

    // TODO: Is this needed?
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "next-auth"],
  },
};

module.exports = nextConfig;
