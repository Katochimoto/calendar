var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var srcPath = path.join(__dirname, 'src');
var distPath = path.join(__dirname, 'dist');
var nodeEnv = 'development'; // production
var preprocessParams = '?NODE_ENV=' + nodeEnv;

module.exports = {
    'debug': false,
    'devtool': '#source-map',
    'target': 'web', // 'electron',
    'entry': {
        'vendor': [
            'react',
            'react-dom',
            'redux',
            'react-redux',
            'redux-devtools',
            'redux-logger',
            'immutable'
        ],
        'app': './index.js'
    },
    'context': srcPath,
    'output': {
        'chunkFilename': '[name].js',
        'crossOriginLoading': 'use-credentials',
        'filename': '[name].js',
        'libraryTarget': 'umd',
        'path': distPath
    },
    'module': {
        'preLoaders': [
            {
                'test': /\.js$/,
                'loader': 'eslint',
                'include': [ srcPath ]
            }
        ],
        'loaders': [
            {
                'test': /\.js$/,
                'loader': 'babel!preprocess' + preprocessParams,
                'include': [ srcPath ]
            }
        ]
    },
    'plugins': [
        new webpack.DefinePlugin({
            'NODE_ENV': JSON.stringify(nodeEnv),
            'process.env.NODE_ENV': JSON.stringify(nodeEnv),
            'process.env': {
                'NODE_ENV': JSON.stringify(nodeEnv)
            }
        }),
        new webpack.ProvidePlugin({
            'React': 'react',
            'ReactDOM': 'react-dom',
            'ReactDOMServer': 'react-dom/server'
        }),
        new webpack.optimize.OccurenceOrderPlugin(true),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            'name': 'vendor',
            'filename': '[name].js',
            'minChunks': Infinity
        }),
        new HtmlWebpackPlugin({
            'title': 'Reader',
            'inject': 'body',
            'template': 'index.html',
            'hash': true,
            'minify': {
                'removeComments': false,
                'collapseWhitespace': true,
                'preserveLineBreaks': true
            }
        }),
        /*
        new webpack.optimize.UglifyJsPlugin({
            'output': {
                'comments': false
            },
            'compress': {
                'warnings': false
            }
        })
        */
    ]
};
