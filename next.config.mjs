import CopyPlugin from "copy-webpack-plugin";
import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals = config.externals || [];
    config.externals.push("pino-pretty", "lokijs", "encoding");
    config.experiments = { ...config.experiments, topLevelAwait: true };

    config.plugins.push(
      new CopyPlugin({
        patterns: [
          // For Vercel
          {
            from: path.resolve(
              "node_modules/@xmtp/user-preferences-bindings-wasm/dist/node/*.wasm"
            ),
            to: path.resolve("/var/task/.next/server/chunks/[name][ext]"),
          },
          {
            from: path.resolve(
              "node_modules/@xmtp/user-preferences-bindings-wasm/dist/node/*.wasm"
            ),
            to: path.resolve(".next/server/vendor-chunks/[name][ext]"),
          },
          {
            from: path.resolve(
              "node_modules/@xmtp/user-preferences-bindings-wasm/dist/node/*.wasm"
            ),
            to: path.resolve(".next/server/chunks/[name][ext]"),
          },
          {
            from: path.resolve(
              "node_modules/@xmtp/user-preferences-bindings-wasm/dist/node/*.wasm"
            ),
            to: path.resolve(".next/server/app/api/transaction/[name][ext]"),
          },
          {
            from: path.resolve(
              "node_modules/@xmtp/user-preferences-bindings-wasm/dist/node/*.wasm"
            ),
            to: path.resolve(
              ".next/server/app/api/transaction-success/[name][ext]"
            ),
          },
        ],
      })
    );

    return config;
  },
};

export default nextConfig;
