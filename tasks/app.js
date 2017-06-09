import RollupPluginBabel from 'rollup-plugin-babel';
import RollupPluginBuble from 'rollup-plugin-buble';
import RollupPluginCommonJS from 'rollup-plugin-commonjs';
import RollupPluginFilesize from 'rollup-plugin-filesize';
import RollupPluginInject from 'rollup-plugin-inject';
import RollupPluginJSON from 'rollup-plugin-json';
import RollupPluginLess2 from 'rollup-plugin-less2';
import RollupPluginNodeResolve from 'rollup-plugin-node-resolve';
import RollupPluginPreprocess from 'rollup-plugin-preprocess';
import RollupPluginReplace from 'rollup-plugin-replace';

import LessPluginCssModules from 'less-plugin-css-modules';

import autoprefixer from 'autoprefixer';
import postcss from 'postcss';
import PostcssCsso from 'postcss-csso';
import CssMqpacker from 'css-mqpacker';

const pkg = require('../package.json');
const external = Object.keys(pkg.peerDependencies || {}).concat(Object.keys(pkg.dependencies || {}));

export function generate ({
  env = 'development'
} = {}) {
  return {
    format: 'iife',
    exports: 'none',
    useStrict: true,
    globals: {
      'classnames': 'vendor._classnames',
      'preact-compat': 'vendor._preact_compat',
      'preact': 'vendor._preact',
      'prop-types': 'vendor._prop_types'
    }
  };
}

export function rollup ({
  env = 'development'
} = {}) {
  return {
    sourceMap: true,
    context: 'window',
    external: external,

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
            CssMqpacker(),
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
        'process.env.NODE_ENV': JSON.stringify(env)
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
          'external-helpers',
          'transform-flow-strip-types',
          'transform-decorators-legacy',
          'transform-do-expressions',
          'transform-object-rest-spread',
          'transform-function-bind',
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
        transforms: {
          dangerousTaggedTemplateString: true
        }
      }),

      RollupPluginNodeResolve({
        externals: external
      }),

      RollupPluginCommonJS({
        include: 'node_modules/**',
        exclude: '**/*.less'
      }),

      RollupPluginPreprocess({
        context: {
          NODE_ENV: env
        }
      }),

      RollupPluginFilesize()
    ]
  };
};
