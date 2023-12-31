/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const DefinePlugin = webpack.DefinePlugin;
const ModuleFederationPlugin = webpack.container.ModuleFederationPlugin;

const cssRules = [
    {
        loader: "css-loader",
    },
];

const scssRules = [
    ...cssRules,
    {
        loader: "postcss-loader",
        options: {
            postcssOptions: {
                plugins: [require("postcss-sass-unicode"), require("autoprefixer")()],
            },
            sourceMap: true,
        },
    },
    {
        loader: "sass-loader",
        options: {
            sassOptions: {
                includePaths: [path.resolve(__dirname, "node_modules")],
            },
            sourceMap: true,
        },
    },
];

module.exports = function getWebpackConfig(env) {
    const mode = env.mode ? "production" : "development";
    const backend = env.backend ?? "http://localhost:8080";
    const port = env.port ?? "3001";

    return {
        entry: "./src/index.ts",
        mode,
        output: {
            publicPath: `/`,
            filename: "[name].js",
            // publicPath: "auto",
        },
        devServer: {
            port,
            open: false,
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            // http2: true,
            // https: {
            //     key: fs.readFileSync("cert/server.key"),
            //     cert: fs.readFileSync("cert/server.crt"),
            // },
            historyApiFallback: true,
            proxy: {
                "/api": {
                    changeOrigin: true,
                    cookieDomainRewrite: "localhost",
                    secure: false,
                    target: backend,
                    headers: {
                        host: backend,
                    },
                },
            },
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx|tsx|ts)$/,
                    loader: "ts-loader",
                    exclude: /node_modules/,
                },
                {
                    test: /\.scss$/,
                    use: ["style-loader", ...scssRules],
                },
                {
                    test: /\.css$/,
                    use: ["style-loader", ...cssRules],
                },
            ],
        },
        resolve: {
            extensions: [".js", ".jsx", ".ts", ".tsx", ".scss", ".json"],
            mainFields: ["module", "browser", "main"],
            fallback: {
                path: require.resolve("path-browserify"),
            },
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "./public/index.html",
            }),
            new DefinePlugin({
                "process.env": JSON.stringify(dotenv.config().parsed),
            }),
            new ModuleFederationPlugin({
                name: "home",
                filename: "remoteEntry.js",
                remotes: {},
                shared: {
                    react: {
                        singleton: true,
                    },
                    "react-dom": {
                        singleton: true,
                    },
                    bootstrap: {
                        singleton: true,
                    },
                    "react-bootstrap": {
                        singleton: true,
                    },
                },
            }),
        ],
    };
};
