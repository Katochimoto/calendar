import RollupPluginNodeResolve from 'rollup-plugin-node-resolve';
import RollupPluginCommonJS from 'rollup-plugin-commonjs';
import RollupPluginReplace from 'rollup-plugin-replace';
import RollupPluginBuble from 'rollup-plugin-buble';

export function rollup (options) {
  return {
    entry: `${options.src}/${options.moduleName}.js`,
    format: 'cjs',
    exports: 'none',
    useStrict: true,

    sourceMap: false,
    plugins: [
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
        include: 'node_modules/**'
      })
    ]
  };
}
