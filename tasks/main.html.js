import gulp from 'gulp';

export function sources ({ env, dist }) {
  return gulp.src([
    `${dist}/vendor.js`,
    `${dist}/app.js`,

    `${dist}/vendor.css`,
    `${dist}/app.css`
  ], {
    read: false
  });
}

export function options ({ env, dist }) {
  return {
    relative: false,
    ignorePath: dist,
    addRootSlash: false,
    removeTags: true
  };
}
