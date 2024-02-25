import dartSass from 'sass';
import gulpSass from 'gulp-sass'
const sass = gulpSass(dartSass);
export const scss = () => {
    return app.gulp.src(app.path.src.scss, { sourcemaps: app.isDev }) // get all scss
    .pipe(app.plugins.plumber(app.plugins.notify.onError({ title: "SCSS", message: "Error: <%= error.message %>" }))) // error masage
    .pipe(app.plugins.replace(/@img/g, `../img/`))  // replase url
    .pipe(sass().on('error', sass.logError)) // convert to css
    .pipe(app.plugins.autoprefixer({ overrideBrowserslist: ['last 5 versions'], grid: true, cascade: true }))
     .pipe(app.plugins.gulpif( // webpCss
        app.isBuild == true && flag.webp == true,
            app.plugins.webpCss()))
    .pipe(app.gulp.dest(app.path.build.css)) // input file
    // min file css
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))  // convert to css
    .pipe(app.plugins.rename({ extname: ".min.css" })) // remein file
     .pipe(app.gulp.dest(app.path.build.css)) // input file
    .pipe(app.plugins.browserSync.stream()) // server
}