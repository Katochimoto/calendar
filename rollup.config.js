import RollupPluginJSON from 'rollup-plugin-json';
import RollupPluginLess2 from 'rollup-plugin-less2';
import RollupPluginBabel from 'rollup-plugin-babel';
import RollupPluginNodeResolve from 'rollup-plugin-node-resolve';
import RollupPluginCommonJS from 'rollup-plugin-commonjs';
import RollupPluginFilesize from 'rollup-plugin-filesize';
import RollupPluginReplace from 'rollup-plugin-replace';
import RollupPluginInject from 'rollup-plugin-inject';
import RollupPluginUglify from 'rollup-plugin-uglify';

import LessPluginCssModules from 'less-plugin-css-modules';

import autoprefixer from 'autoprefixer';
import postcss from 'postcss';
import PostcssCsso from 'postcss-csso';
import CssMqpacker from 'css-mqpacker';

let pkg = require('./package.json');
let external = Object.keys(pkg.peerDependencies || {}).concat(Object.keys(pkg.dependencies || {}));

export default {
  entry: 'src/index.js',
  dest: 'dist/app.js',
  format: 'iife',
  sourceMap: true,
  useStrict: false,
  context: 'window',
  external: external,
  globals: {
    'classnames': 'vendor._classnames',
    'raf': 'vendor._raf',
    'preact-compat': 'vendor._preact_compat',
    'preact': 'vendor._preact'
  },
  plugins: [
    RollupPluginJSON(),
    RollupPluginLess2({
      output: 'dist/app.css',
      cssModules: true,
      options: {
        plugins: [
          new LessPluginCssModules({
            mode: 'local',
            hashPrefix: 'calendar',
            generateScopedName: '[local]___[hash:base64:5]' // '[hash:base64:8]'
          })
        ]
      },
      onWriteBefore: function (cssText) {
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
          CssMqpacker(),
          PostcssCsso()
        ]).process(cssText).then(function (result) {
          return result.css;
        });
      }
    }),
    RollupPluginReplace({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    RollupPluginBabel({
      exclude: 'node_modules/**',
      babelrc: false,
      presets: [
        'stage-0',
        'es2015-rollup',
        'react'
      ],
      plugins: [
        [ 'transform-react-jsx', { pragma: 'h' } ],
        [
          'module-resolver',
          {
            root: [ '.' ],
            alias: {
              'react-dom': 'preact-compat',
              'react': 'preact-compat'
            }
          }
        ]
      ]
    }),
    RollupPluginInject({
      'h': [ 'preact', 'h' ]
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
    RollupPluginUglify(),
    RollupPluginFilesize()
  ]
};
