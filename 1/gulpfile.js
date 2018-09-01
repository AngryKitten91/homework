const gulp = require('gulp');
const sass = require('gulp-sass');

gulp.task('sass', ()=>{
    return gulp.src('styles.scss')
      .pipe(sass())
      .pipe(gulp.dest('./'))
  });

  gulp.task('watch', ()=>{
      gulp.watch('./**/*.scss', [sass]);
  })