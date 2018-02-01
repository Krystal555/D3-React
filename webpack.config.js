/**
 * Created by zaoyu on 2018/1/24.
 */
'use strict';

const path = require('path');
const webpack = require('webpack');

const os = require('os');
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length});

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

const root = path.join(__dirname, './');
const srcPath = path.join(root, 'app');
const buildPath = path.join(root, 'build');
const env = process.env.NODE_ENV || 'development';

module.exports = {
    context: srcPath,//app包
    entry: [
        'react-hot-loader/patch',
        './index'
    ],
    devtool: 'cheap-module-source-map',
    output:{
        path:buildPath,
        filename:'bundle.js'
    },
    resolve: {
        modules: [
            srcPath,
            'node_modules'
        ],
        extensions: ['.web.js','.js', '.jsx']
    },
    module:{
        rules: [
            {
                test: /\.js|jsx$/,
                exclude: /node_modules/,
                loader: 'happypack/loader',
                options: {
                    id: 'js'
                },
            },
            {
                test: /\.(less|css)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'happypack/loader',
                        options: {
                            id: 'less'
                        }
                    }]
                })
            },

            {
                oneOf: [
                    {
                        test: /\.html$/,
                        resourceQuery: /\?.*/,
                        use: [
                            'extract-loader',
                            'html-loader'
                        ]
                    },
                    {
                        test: /\.html$/,
                        loader: 'html-loader'
                    }
                ]
            },
            {
                oneOf: [
                    {
                        test: /\.(png|gif|jpg|jpeg|svg|woff|ttf|eot)$/,
                        exclude: /node_modules/,
                        resourceQuery: /\?.*/,
                        loader: 'url-loader'
                    },
                    {
                        test: /\.(png|gif|jpg|jpeg|svg|woff|ttf|eot)$/,
                        exclude: /node_modules/,
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins:[
        new HappyPack({
            id: 'js',
            threadPool: happyThreadPool,
            loaders: ['babel-loader'],
            verbose: true,
            verboseWhenProfiling: true
        }),
        new HappyPack({
            id: 'less',
            threadPool: happyThreadPool,
            loaders: [
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true
                    }
                },
                {
                    loader: 'less-loader',
                    options: {
                        sourceMap: true
                    }
                }],
            verbose: true,
            verboseWhenProfiling: true
        }),
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(env)
            }
        }),
        new webpack.optimize.OccurrenceOrderPlugin(true),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common/index',
            filename: 'common.js',
            minChunks: 4
        }),
        new HtmlWebpackPlugin({
            inject: true,
            filename: './index.html',
            template: './index.html'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new OpenBrowserPlugin({url:'http://localhost:3000'})
    ],
    watch:true
};