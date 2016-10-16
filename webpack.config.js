var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var appPath = path.join(__dirname, 'app');
var distPath = path.join(__dirname, 'dist');
var nodeEnv = 'development'; // production
var preprocessParams = '?NODE_ENV=' + nodeEnv;

module.exports = {
    'debug': false,
    'devtool': '#source-map',
    'target': 'electron',
    'entry': {
        'app': './index.js'
    },
    'context': appPath,
    'output': {
        'filename': '[name].js',
        'library': '[name]',
        'libraryTarget': 'umd',
        'path': distPath
    },
    'module': {
        'preLoaders': [
            {
                'test': /\.js$/,
                'loader': 'eslint',
                'include': [ appPath ]
            }
        ],
        'loaders': [
            {
                'test': /\.js$/,
                'loader': 'babel!preprocess' + preprocessParams,
                'include': [ appPath ]
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
        new webpack.optimize.UglifyJsPlugin({
            'output': {
                'comments': false
            },
            'compress': {
                'warnings': false
            }
        })
    ]
};
