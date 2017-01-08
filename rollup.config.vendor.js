import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import filesize from 'rollup-plugin-filesize';

export default {
  entry: 'src/vendor.js',
  format: 'iife',
  dest: 'dist/vendor.js',
  sourceMap: true,
  useStrict: false,
  context: 'window',
  moduleName: 'vendor',
  plugins: [
    resolve({
      jsnext: true,
      module: true,
      main: true,
      browser: true,
    }),
    commonjs({
      include: 'node_modules/**',
    }),
    filesize(),
  ],
};
