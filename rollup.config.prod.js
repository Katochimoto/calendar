import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import filesize from 'rollup-plugin-filesize';

import less from 'rollup-plugin-less';
import lessPluginGlob from 'less-plugin-glob';
import lessPluginGroupMediaQueries from 'less-plugin-group-css-media-queries';

export default {
  entry: 'src/index.js',
  format: 'iife',
  dest: 'dist/app.js',
  sourceMap: true,
  useStrict: false,
  context: 'window',
  plugins: [
    json(),
    less({
      insert: true,
      option: {
        plugins: [
          lessPluginGlob,
          lessPluginGroupMediaQueries,
        ],
      },
    }),
    babel({
      exclude: 'node_modules/**',
      babelrc: false,
      presets: [
        'stage-0',
        [ 'es2015', { modules: false } ],
        'react',
      ],
      plugins: [
        'external-helpers',
        [ 'transform-react-jsx', { pragma: 'h' } ],
        [
          'module-resolver',
          {
            root: [ '.' ],
            alias: {
              'react-dom': 'preact-compat',
              'react': 'preact-compat',
            },
          },
        ],
      ],
    }),
    resolve({
      jsnext: true,
      module: true,
      main: true,
      browser: true,
      extensions: [
        '.js',
        '.less',
      ],
    }),
    commonjs({
      include: 'node_modules/**',
    }),
    filesize(),
  ],
};
