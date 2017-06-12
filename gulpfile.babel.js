import gulp from 'gulp';
import hash from 'gulp-hash';
import rollup from 'gulp-better-rollup';
import gulpif from 'gulp-if';
import uglify from 'gulp-uglify';
import size from 'gulp-size';
import inject from 'gulp-inject';
import minimist from 'minimist';
import del from 'del';
import { exec } from 'child_process';

import {
  rollup as vendorRollup,
  generate as vendorGenerate
} from './tasks/vendor.js';

import {
  rollup as appRollup,
  generate as appGenerate
} from './tasks/app.js';

import {
  rollup as mainRollup,
  generate as mainGenerate
} from './tasks/main.js';

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

  return gulp.src('src/app.js')
    .pipe(rollup(appRollup(options), appGenerate(options)))
    .pipe(gulpif(OPTIONS.env === 'production', uglify()))
    .pipe(size({ title: moduleName }))
    .pipe(gulp.dest(OPTIONS.dist));
}

export function vendor () {
  const moduleName = 'vendor';
  const options = { ...OPTIONS, moduleName };

  return gulp.src('src/vendor.js')
    .pipe(rollup(vendorRollup(options), vendorGenerate(options)))
    .pipe(gulpif(OPTIONS.env === 'production', uglify()))
    .pipe(size({ title: moduleName }))
    .pipe(gulp.dest(OPTIONS.dist));
}

export function main () {
  const moduleName = 'main';
  const options = { ...OPTIONS, moduleName };

  return gulp.src('src/main.js')
    .pipe(rollup(mainRollup(options), mainGenerate(options)))
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
  gulp.watch([
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
