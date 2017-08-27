import RollupPluginBabel from 'rollup-plugin-babel';
import RollupPluginBuble from 'rollup-plugin-buble';
import RollupPluginCommonJS from 'rollup-plugin-commonjs';
import RollupPluginInject from 'rollup-plugin-inject';
import RollupPluginJSON from 'rollup-plugin-json';
import RollupPluginLess2 from 'rollup-plugin-less2';
import RollupPluginNodeResolve from 'rollup-plugin-node-resolve';
import RollupPluginReplace from 'rollup-plugin-replace';
import RollupPluginPreprocess from 'rollup-plugin-preprocess';

import {
  options as getLessOptions
} from './less.app.js';

const external = [
  'classnames',
  'preact-compat',
  'preact',
  'prop-types',
  'react-redux',
  'react-router-dom',
  'redux-actions',
  'redux-saga',
  'redux',
];

export default function (options) {
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
      'prop-types': 'vendor._prop_types',
      'react-redux': 'vendor._react_redux',
      'react-router-dom': 'vendor._react_router_dom',
      'redux-actions': 'vendor._redux_actions',
      'redux-saga': 'vendor._redux_saga',
      'redux': 'vendor._redux',
    },

    sourceMap: false,
    context: 'window',
    external: external,
    plugins: [
      RollupPluginJSON(),

      RollupPluginLess2(lessOptions),

      RollupPluginReplace({
        'process.env.NODE_ENV': JSON.stringify(options.env)
      }),

      RollupPluginBabel({
        // exclude: 'node_modules/**',
        babelrc: false,
        presets: [
          //'stage-0',
          //'es2015-rollup',
          //'react'
        ],
        plugins: [
          'external-helpers',
          'syntax-async-functions',
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
        modules: {
          'h': [ 'preact', 'h' ],
          'React.createElement': [ 'preact', 'h' ]
        }
      }),

      RollupPluginBuble({
        exclude: 'node_modules/**',
        transforms: {
          dangerousTaggedTemplateString: true,
          generator: false
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
