import gulp from 'gulp';
import hash from 'gulp-hash';
import rollup from 'rollup-stream';
import gulpif from 'gulp-if';
import uglify from 'gulp-uglify';
import preprocess from 'gulp-preprocess';
import sourcemaps from 'gulp-sourcemaps';
import sizereport from 'gulp-sizereport';
import minimist from 'minimist';
import del from 'del';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import { exec } from 'child_process';

import vendorRollup from './tasks/rollup.vendor.js';
import appRollup from './tasks/rollup.app.js';
import mainRollup from './tasks/rollup.main.js';

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
    .pipe(sourcemaps.init())
    .pipe(gulpif(OPTIONS.env === 'production', uglify()))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(OPTIONS.dist));
}

export function vendor () {
  const moduleName = 'vendor';
  const options = { ...OPTIONS, moduleName };

  return rollup(vendorRollup(options))
    .pipe(source('vendor.js', OPTIONS.src))
    .pipe(buffer())
    .pipe(sourcemaps.init())
    .pipe(gulpif(OPTIONS.env === 'production', uglify()))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(OPTIONS.dist));
}

export function main () {
  const moduleName = 'main';
  const options = { ...OPTIONS, moduleName };

  return rollup(mainRollup(options))
    .pipe(source('main.js', OPTIONS.src))
    .pipe(buffer())
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
    .pipe(preprocess({
      context: {
        NODE_ENV: OPTIONS.env,
        static: function (name) {
          return name;
        }
      }
    }))
    .pipe(gulp.dest(OPTIONS.dist));
}

export function watch() {
  gulp.watch([
    'src/**/*.js',
    'src/**/*.less',
    'src/**/*.svg'
  ], gulp.parallel(app, mainhtml));
}

export function clean () {
  return del([ OPTIONS.dist, OPTIONS.build ]);
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

export  function report () {
  return gulp.src(`${OPTIONS.dist}/*`)
    .pipe(sizereport({
      gzip: true,
      total: false
    }));
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
