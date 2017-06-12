import RollupPluginBabel from 'rollup-plugin-babel';
import RollupPluginBuble from 'rollup-plugin-buble';
import RollupPluginCommonJS from 'rollup-plugin-commonjs';
import RollupPluginInject from 'rollup-plugin-inject';
import RollupPluginJSON from 'rollup-plugin-json';
import RollupPluginLess2 from 'rollup-plugin-less2';
import RollupPluginNodeResolve from 'rollup-plugin-node-resolve';
import RollupPluginPreprocess from 'rollup-plugin-preprocess';
import RollupPluginReplace from 'rollup-plugin-replace';

import {
  options as getLessOptions
} from './less.app.js';

const pkg = require('../package.json');
const external = Object.keys(pkg.peerDependencies || {}).concat(Object.keys(pkg.dependencies || {}));

export function rollup (options) {
  const lessOptions = getLessOptions(options);

  return {
    entry: `${options.src}/${options.moduleName}.js`,
    format: 'iife',
    exports: 'none',
    useStrict: true,
    globals: {
      'classnames': 'vendor._classnames',
      'preact-compat': 'vendor._preact_compat',
      'preact': 'vendor._preact',
      'prop-types': 'vendor._prop_types'
    },

    sourceMap: true,
    context: 'window',
    external: external,
    plugins: [
      RollupPluginJSON(),

      RollupPluginLess2(lessOptions),

      RollupPluginReplace({
        'process.env.NODE_ENV': JSON.stringify(options.env)
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
          NODE_ENV: options.env
        }
      })
    ]
  };
};
