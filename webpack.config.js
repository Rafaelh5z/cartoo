const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { InjectManifest } = require('workbox-webpack-plugin');
const { DefinePlugin } = require('webpack');

module.exports = (env, argv) => {
    const isDevelopment = argv.mode === 'development';

    return {
        entry: './src/main.tsx',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: isDevelopment ? '[name].js' : '[name].[contenthash].js',
            clean: true,
            publicPath: '/',
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js', '.jsx'],
            alias: {
                '@': path.resolve(__dirname, './src'),
                '@/Product': path.resolve(__dirname, './src/Product'),
                '@/Shared': path.resolve(__dirname, './src/Shared'),
                '@/UI': path.resolve(__dirname, './src/UI'),
            },
        },
        module: {
            rules: [
                // TypeScript and React
                {
                    test: /\.(ts|tsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env',
                                ['@babel/preset-react', { runtime: 'automatic' }],
                                '@babel/preset-typescript',
                            ],
                        },
                    },
                },
                // CSS
                {
                    test: /\.css$/,
                    use: [
                        isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
                        'css-loader',
                        'postcss-loader',
                    ],
                },
                // Images and assets
                {
                    test: /\.(png|jpg|jpeg|gif|svg|webp)$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: 'assets/[name].[hash][ext]',
                    },
                },
                // Fonts
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: 'fonts/[name].[hash][ext]',
                    },
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './index.html',
                inject: 'body',
            }),
            new CopyWebpackPlugin({
                patterns: [
                    { from: 'public/manifest.json', to: 'manifest.json' },
                    { from: 'public/icons', to: 'icons' },
                    { from: 'public/favicon.svg', to: 'favicon.svg' },
                ],
            }),
            new Dotenv({
                systemvars: true,
            }),
            new DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(argv.mode || 'development'),
            }),
            !isDevelopment && new MiniCssExtractPlugin({
                filename: 'css/[name].[contenthash].css',
            }),
            !isDevelopment && new InjectManifest({
                swSrc: './src/service-worker.js',
                swDest: 'service-worker.js',
                exclude: [/\.map$/, /^manifest.*\.js$/],
            }),
        ].filter(Boolean),
        devServer: {
            static: {
                directory: path.join(__dirname, 'public'),
            },
            historyApiFallback: true,
            compress: true,
            port: 5173,
            hot: true,
            open: true,
        },
        devtool: isDevelopment ? 'eval-source-map' : 'source-map',
        performance: {
            hints: isDevelopment ? false : 'warning',
            maxEntrypointSize: 512000,
            maxAssetSize: 512000,
        },
    };
};
