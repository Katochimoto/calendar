import RollupPluginNodeResolve from 'rollup-plugin-node-resolve';
import RollupPluginCommonJS from 'rollup-plugin-commonjs';
import RollupPluginFilesize from 'rollup-plugin-filesize';
import RollupPluginReplace from 'rollup-plugin-replace';

export default {
  entry: 'src/vendor.js',
  format: 'iife',
  dest: 'dist/vendor.js',
  sourceMap: true,
  useStrict: false,
  context: 'window',
  moduleName: 'vendor',
  plugins: [
    RollupPluginReplace({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    RollupPluginNodeResolve({
      jsnext: true,
      module: true,
      main: true,
      browser: true
    }),
    RollupPluginCommonJS({ include: 'node_modules/**' }),
    RollupPluginFilesize()
  ]
};
