import RollupPluginNodeResolve from 'rollup-plugin-node-resolve';
import RollupPluginCommonJS from 'rollup-plugin-commonjs';
import RollupPluginFilesize from 'rollup-plugin-filesize';
import RollupPluginReplace from 'rollup-plugin-replace';
import RollupPluginBuble from 'rollup-plugin-buble';

const NODE_ENV = 'development'; // production

export default {
  entry: 'src/vendor.js',
  dest: 'dist/vendor.js',
  format: 'iife',
  exports: 'default',
  sourceMap: false,
  useStrict: true,
  context: 'window',
  moduleName: 'vendor',
  plugins: [
    RollupPluginReplace({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
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
      include: 'node_modules/**'
    }),

    RollupPluginFilesize()
  ]
};
