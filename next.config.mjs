import CopyPlugin from "copy-webpack-plugin";
import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals = config.externals || [];
    config.externals.push("pino-pretty", "lokijs", "encoding");
    config.plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: path.join(
              process.cwd(),
              "node_modules/@xmtp/user-preferences-bindings-wasm/dist/node/*.wasm"
            ),
            to: path.join(
              process.cwd(),
              ".next/server/vendor-chunks/[name][ext]"
            ),
          },
          {
            from: path.join(
              process.cwd(),
              "node_modules/@xmtp/user-preferences-bindings-wasm/dist/node/*.wasm"
            ),
            to: path.resolve(process.cwd(), ".next/server/chunks/[name][ext]"),
          },
          {
            from: path.join(
              process.cwd(),
              "node_modules/@xmtp/user-preferences-bindings-wasm/dist/node/*.wasm"
            ),
            to: path.join(
              process.cwd(),
              ".next/server/app/api/transaction/[name][ext]"
            ),
          },
          {
            from: path.join(
              process.cwd(),
              "node_modules/@xmtp/user-preferences-bindings-wasm/dist/node/*.wasm"
            ),
            to: path.join(
              process.cwd(),
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
