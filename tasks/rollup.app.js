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

const external = {
  'classnames': 'vendor._classnames',
  'history': 'vendor._history',
  'preact-compat': 'vendor._preact_compat',
  'preact': 'vendor._preact',
  'prop-types': 'vendor._prop_types',
  'react-redux': 'vendor._react_redux',
  'react-router-dom': 'vendor._react_router_dom',
  'react-router-redux': 'vendor._react_router_redux',
  'react-router': 'vendor._react_router',
  'redux-actions': 'vendor._redux_actions',
  'redux-form': 'vendor._redux_form',
  'redux-persist': 'vendor._redux_persist',
  'redux-saga': 'vendor._redux_saga',
  'redux': 'vendor._redux',
  'reselect': 'vendor._reselect',
};

export default function (options) {
  const lessOptions = getLessOptions(options);

  return {
    entry: `${options.src}/${options.moduleName}.js`,
    format: 'iife',
    exports: 'none',
    useStrict: true,
    globals: external,

    sourceMap: false,
    context: 'window',
    external: Object.keys(external),
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
        externals: Object.keys(external)
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
