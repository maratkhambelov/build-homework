import path from "node:path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import { RsdoctorWebpackPlugin } from "@rsdoctor/webpack-plugin";

const outDir = path.resolve(process.cwd(), "dist");

const config = {
    mode: "production",
    target: "web",
    entry: "./src/main.tsx",
    output: {
        path: outDir,
        filename: "assets/[name].[contenthash:8].js",
        chunkFilename: "assets/[name].[contenthash:8].chunk.js",
        clean: true,
        publicPath: "/",
    },
    resolve: {
        extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
        plugins: [new TsconfigPathsPlugin()],
        fallback: {
            path: false,
            crypto: false,
            fs: false,
        },
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "swc-loader",
                    options: {
                        jsc: {
                            parser: {
                                syntax: "typescript",
                                tsx: true,
                            },
                            transform: {
                                react: {
                                    runtime: "automatic",
                                },
                            },
                        },
                    },
                },
            },
            {
                test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
                type: "asset",
                generator: { filename: "assets/[name].[contenthash:8][ext]" },
            },
            {
                test: /\.(woff2?|ttf|eot|otf)$/i,
                type: "asset/resource",
                generator: { filename: "assets/[name].[contenthash:8][ext]" },
            },
        ],
    },

    experiments: {
        css: true,
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: "./template.html",
        }),
        new RsdoctorWebpackPlugin(),
    ],
};

export default config;
