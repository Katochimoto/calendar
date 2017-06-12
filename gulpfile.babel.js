import gulp from 'gulp';
import hash from 'gulp-hash';
import rollup from 'rollup-stream';
import gulpif from 'gulp-if';
import uglify from 'gulp-uglify';
import size from 'gulp-size';
import inject from 'gulp-inject';
import minimist from 'minimist';
import del from 'del';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import { exec } from 'child_process';

import {
  rollup as vendorRollup
} from './tasks/rollup.vendor.js';

import {
  rollup as appRollup
} from './tasks/rollup.app.js';

import {
  rollup as mainRollup
} from './tasks/rollup.main.js';

import {
  sources as injectSources,
  options as injectOptions
} from './tasks/main.html.js';

const OPTIONS = minimist(process.argv.slice(2), {
  string: [
    'env',
    'dist',
    'build',
    'src'
  ],
  default: {
    env: process.env.NODE_ENV || 'development', //'production'
    dist: 'dist',
    build: 'build',
    src: 'src'
  }
});

export function app () {
  const moduleName = 'app';
  const options = { ...OPTIONS, moduleName };

  return rollup(appRollup(options))
    .pipe(source('app.js', OPTIONS.src))
    .pipe(buffer())
    .pipe(gulpif(OPTIONS.env === 'production', uglify()))
    .pipe(size({ title: moduleName }))
    .pipe(gulp.dest(OPTIONS.dist));
}

export function vendor () {
  const moduleName = 'vendor';
  const options = { ...OPTIONS, moduleName };

  return rollup(vendorRollup(options))
    .pipe(source('vendor.js', OPTIONS.src))
    .pipe(buffer())
    .pipe(gulpif(OPTIONS.env === 'production', uglify()))
    .pipe(size({ title: moduleName }))
    .pipe(gulp.dest(OPTIONS.dist));
}

export function main () {
  const moduleName = 'main';
  const options = { ...OPTIONS, moduleName };

  return rollup(mainRollup(options))
    .pipe(source('main.js', OPTIONS.src))
    .pipe(buffer())
    .pipe(size({ title: moduleName }))
    .pipe(gulp.dest(OPTIONS.dist));
}

export function assets () {
  return gulp.src([`${OPTIONS.dist}/**/*.js`, `${OPTIONS.dist}/**/*.css`])
    .pipe(hash())
    .pipe(gulp.dest(`${OPTIONS.dist}/_`))
    .pipe(hash.manifest('assets.json'))
    .pipe(gulp.dest(OPTIONS.dist));
}

export function mainhtml () {
  const options = { ...OPTIONS };

  return gulp.src('src/main.html')
    .pipe(inject(injectSources(options), injectOptions(options)))
    .pipe(gulp.dest(OPTIONS.dist));
}

export function watch() {
  return gulp.watch([
    'src/**/*.js',
    'src/**/*.less'
  ], app);
}

export function clean () {
  return del([ 'dist', 'build' ]);
}

export function pkg () {
  return cmd(
    `./node_modules/.bin/electron-packager . $npm_package_name \
    --platform=darwin \
    --arch=x64 \
    --electron-version=$npm_package_electronVersion \
    --app-version=$npm_package_version \
    --out=${OPTIONS.build} \
    --ignore=${OPTIONS.build} \
    --prune \
    --overwrite`
  );
}

const build = gulp.series(
  clean,
  gulp.parallel(app, vendor, main),
  assets,
  mainhtml
);

export {
  build
};

export default build;

function cmd (data) {
  return new Promise(function (resolve, reject) {
    exec(data, function (err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}
