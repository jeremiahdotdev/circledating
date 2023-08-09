/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack: (config) => {
		config.module.rules.push({
			test: /\.svg$/,
			exclude: /node_modules/,
			use: {
				loader: "svg-react-loader",
			},
		});

		return config;
	}
};

module.exports = nextConfig;
