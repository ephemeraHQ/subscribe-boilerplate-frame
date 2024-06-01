import CopyPlugin from "copy-webpack-plugin";
import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    config.externals = config.externals || [];
    config.externals.push("pino-pretty", "lokijs", "encoding");
    config.experiments = { ...config.experiments, topLevelAwait: true };

    if (isServer) {
      config.plugins.push(
        new CopyPlugin({
          patterns: [
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
    }

    return config;
  },
};

export default nextConfig;
