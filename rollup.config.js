import RollupPluginJSON from 'rollup-plugin-json';
import RollupPluginLess2 from 'rollup-plugin-less2';
import RollupPluginBabel from 'rollup-plugin-babel';
import RollupPluginNodeResolve from 'rollup-plugin-node-resolve';
import RollupPluginCommonJS from 'rollup-plugin-commonjs';
import RollupPluginFilesize from 'rollup-plugin-filesize';
import RollupPluginReplace from 'rollup-plugin-replace';
import RollupPluginInject from 'rollup-plugin-inject';
import RollupPluginBuble from 'rollup-plugin-buble';
import RollupPluginPreprocess from 'rollup-plugin-preprocess';
//import RollupPluginUglify from 'rollup-plugin-uglify';

import LessPluginCssModules from 'less-plugin-css-modules';

import autoprefixer from 'autoprefixer';
import postcss from 'postcss';
import PostcssCsso from 'postcss-csso';
import CssMqpacker from 'css-mqpacker';

const NODE_ENV = 'development'; // production
const IS_DEV = (NODE_ENV === 'development');

let pkg = require('./package.json');
let external = Object.keys(pkg.peerDependencies || {}).concat(Object.keys(pkg.dependencies || {}));

export default {
  entry: 'src/index.js',
  dest: 'dist/app.js',
  exports: 'none',
  format: 'iife',
  sourceMap: !IS_DEV,
  useStrict: true,
  context: 'window',
  external: external,
  globals: {
    'classnames': 'vendor._classnames',
    'preact-compat': 'vendor._preact_compat',
    'preact': 'vendor._preact'
  },
  plugins: [
    RollupPluginJSON(),
    RollupPluginLess2({
      output: 'dist/app.css',
      // sourceMapOutput: 'dist/app.css.map',
      cssModules: true,
      options: {
        plugins: [
          new LessPluginCssModules({
            mode: 'local',
            hashPrefix: 'calendar',
            generateScopedName: '[local]___[hash:base64:5]' // '[hash:base64:8]'
          })
        ]
        /*
        sourceMap: {
          //outputSourceFiles: true,
          sourceMapRootpath: '../',
          //sourceMapBasepath: '/dist/',
          //sourceMapURL: 'http://localhost:8000',
          //sourceMapFullFilename
        },
        */
      },
      onWriteBefore: function (css, map) {
        return postcss([
          autoprefixer({
            remove: false,
            browsers: [
              '> 1%',
              'Firefox >= 13',
              'Opera >= 12',
              'Chrome >= 4',
            ]
          }),
          CssMqpacker()
          //PostcssCsso()
        ]).process(css, {
          to: 'app.css',
          map: {
            inline: false
          }
        }).then(function (result) {
          return {
            css: result.css,
            map: JSON.parse(result.map)
          };
        });
      }
    }),
    RollupPluginReplace({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
    }),
    RollupPluginBabel({
      exclude: 'node_modules/**',
      babelrc: false,
      presets: [
        //'stage-0',
        //'es2015-rollup',
        //'react'
      ],
      plugins: [
        'transform-decorators-legacy',
        'transform-do-expressions',
        [ 'transform-react-jsx', { pragma: 'h' } ],
        [
          'module-resolver',
          {
            root: [ '.' ],
            alias: {
              'react': 'preact-compat',
              'react-dom': 'preact-compat'
            }
          }
        ]
      ]
    }),
    RollupPluginInject({
      'h': [ 'preact', 'h' ]
    }),
    RollupPluginBuble({
      exclude: 'node_modules/**',
      //target: { chrome: 48, firefox: 44 },
      /*transforms: {
        arrow: true,
        modules: false,
        dangerousForOf: true
      },*/
      //jsx: 'preact.h'
      //objectAssign: 'angular.extend',
    }),
    RollupPluginNodeResolve({
      jsnext: true,
      module: true,
      main: true,
      browser: true,
      skip: external
    }),
    RollupPluginCommonJS({
      include: 'node_modules/**',
      exclude: '**/*.less'
    }),
    RollupPluginPreprocess({
      context: {
        NODE_ENV: NODE_ENV
      }
    }),
    //RollupPluginUglify(),
    RollupPluginFilesize()
  ]
};
