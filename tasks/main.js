import RollupPluginNodeResolve from 'rollup-plugin-node-resolve';
import RollupPluginCommonJS from 'rollup-plugin-commonjs';
import RollupPluginFilesize from 'rollup-plugin-filesize';
import RollupPluginReplace from 'rollup-plugin-replace';

const NODE_ENV = 'development'; // production

export default {
  entry: 'src/main.js',
  dest: 'dist/main.js',
  format: 'cjs',
  exports: 'none',
  sourceMap: false,
  useStrict: true,
  plugins: [
    RollupPluginReplace({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
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
