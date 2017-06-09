import gulp from 'gulp';
import hash from 'gulp-hash';
import rollup from 'gulp-better-rollup';
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


export function app () {
  return gulp.src('src/app.js')
    .pipe(rollup(appRollup(), appGenerate()))
    .pipe(gulp.dest('dist'));
}

export function vendor () {
  return gulp.src('src/vendor.js')
    .pipe(rollup(vendorRollup(), vendorGenerate()))
    .pipe(gulp.dest('dist'));
}

export function main () {
  return gulp.src('src/main.js')
    .pipe(rollup(mainRollup(), mainGenerate()))
    .pipe(gulp.dest('dist'));
}

export function assets () {
  return gulp.src('dist/**/*.js')
    .pipe(hash())
    .pipe(gulp.dest('dist/_'))
    .pipe(hash.manifest('assets.json'))
    .pipe(gulp.dest('dist'));
}

export function clean () {
  return cmd('npm run clean');
}

export function pkg () {
  return cmd(
    `./node_modules/.bin/electron-packager . $npm_package_name \
    --platform=darwin \
    --arch=x64 \
    --electron-version=$npm_package_electronVersion \
    --app-version=$npm_package_version \
    --out=build \
    --ignore=build \
    --prune \
    --overwrite`
  );
}

const build = gulp.series(
  clean,
  gulp.parallel(app, vendor, main),
  assets
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
