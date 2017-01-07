var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var autoprefixer = require('autoprefixer');

var LessPluginGlob = require('less-plugin-glob');
var LessPluginGroupMediaQueries = require('less-plugin-group-css-media-queries');

var srcPath = path.join(__dirname, 'src');
var distPath = path.join(__dirname, 'dist');
var nodeEnv = 'production'; // production development
var preprocessParams = '?NODE_ENV=' + nodeEnv;

module.exports = {
    'debug': false,
    'devtool': '#source-map',
    'target': 'web', // 'electron',
    'entry': {
        'vendor': [
            'raf',
            'preact-compat',
            'classnames',
            'eventemitter3'
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
    'resolve': {
        'extensions': [ '', '.js', '.jsx', '.less' ],
        'alias': {
            'react': 'preact-compat',
            'react-dom': 'preact-compat'
        }
    },
    'module': {
        'noParse': [
            /node_modules[\/\\]immutable[\/\\]dist[\/\\]immutable.js/
        ],
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
            },
            {
                'test': /\.less$/,
                'loaders': [
                    'style-loader',
                    'css-loader?modules&importLoaders=1&localIdentName=[local]___[hash:base64:5]',
                    'postcss-loader',
                    'less-loader?root=true'
                ],
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
            'React': 'preact-compat',
            'ReactDOM': 'preact-compat',
            'preact': 'preact'
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
    ],
    postcss: [
        autoprefixer({ browsers: ['last 2 versions'] })
    ],
    lessLoader: {
        lessPlugins: [
            LessPluginGlob,
            LessPluginGroupMediaQueries
        ]
    }
};
