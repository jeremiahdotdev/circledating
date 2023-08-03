/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: {
    test: /\.svg$/,
    exclude: /node_modules/,
    use: {
      loader: "svg-react-loader",
    },
  },
};

module.exports = nextConfig;
