import RollupPluginNodeResolve from 'rollup-plugin-node-resolve';
import RollupPluginCommonJS from 'rollup-plugin-commonjs';
import RollupPluginReplace from 'rollup-plugin-replace';
import RollupPluginBuble from 'rollup-plugin-buble';
import RollupPluginLess2 from 'rollup-plugin-less2';

import {
  options as getLessOptions
} from './less.vendor.js';

export function rollup (options) {
  const lessOptions = getLessOptions(options);

  return {
    entry: `${options.src}/${options.moduleName}.js`,
    format: 'iife',
    exports: 'default',
    moduleName: 'vendor',
    useStrict: true,

    sourceMap: false,
    context: 'window',
    plugins: [
      RollupPluginLess2(lessOptions),

      RollupPluginReplace({
        'process.env.NODE_ENV': JSON.stringify(options.env)
      }),

      RollupPluginBuble({
        transforms: {
          modules: false
        }
      }),

      RollupPluginNodeResolve({
        jsnext: false,
        module: false,
        main: true
      }),

      RollupPluginCommonJS({
        include: 'node_modules/**',
        exclude: '**/*.less'
      })
    ]
  };
}
