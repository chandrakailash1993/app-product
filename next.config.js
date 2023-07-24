/** @type {import('next').NextConfig} */
const NextFederationPlugin = require("@module-federation/nextjs-mf");
// this enables you to use import() and the webpack parser
// loading remotes on demand, not ideal for SSR
const remotes = (isServer) => {
  const location = isServer ? "ssr" : "chunks";
  return {
    home: `home@http://localhost:3000/_next/static/${location}/remoteEntry.js`,
    shell: `shell@http://localhost:3001/_next/static/${location}/remoteEntry.js`,
  };
};

const nextConfig = {
  webpack(config, options) {
    config.plugins.push(
      new NextFederationPlugin({
        name: "product",
        filename: "static/chunks/remoteEntry.js",
        exposes: {
          "./product": "./pages/product/[id].js",
          "./pages-map": "./pages-map.js",
        },
        remotes: remotes(options.isServer),
        shared: {},
        extraOptions: {
          automaticAsyncBoundary: true,
          exposePages: true,
        },
      })
    );

    return config;
  },
};

module.exports = nextConfig;
