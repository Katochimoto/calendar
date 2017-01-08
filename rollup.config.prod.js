import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import filesize from 'rollup-plugin-filesize';

import less from 'rollup-plugin-less';
import LessPluginGlob from 'less-plugin-glob';
import LessPluginGroupMediaQueries from 'less-plugin-group-css-media-queries';
import LessPluginAutoPrefix from 'less-plugin-autoprefix';

export default {
  entry: 'src/index.js',
  format: 'iife',
  dest: 'dist/app.js',
  sourceMap: true,
  useStrict: false,
  context: 'window',
  external: [
    'classnames',
    'eventemitter3',
    'preact-compat',
    'raf',
  ],
  globals: {
    'classnames': 'vendor._classnames',
    'raf': 'vendor._raf',
    'eventemitter3': 'vendor._eventemitter',
    'preact-compat': 'vendor._preact_compat',
  },
  plugins: [
    json(),
    less({
      output: 'dist/app.css',
      option: {
        plugins: [
          LessPluginGlob,
          LessPluginGroupMediaQueries,
          new LessPluginAutoPrefix({
            browsers: [
              '> 1%',
              'Firefox >= 14',
              'Opera >= 12',
              'Chrome >= 4'
            ]
          }),
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
