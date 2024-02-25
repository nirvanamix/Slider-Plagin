import babel from 'gulp-babel';


export const javascript = () => {
    return app.gulp.src(app.path.src.js, { sourcemaps: app.isDev })
        .pipe(app.plugins.plumber(app.plugins.notify.onError({ title: "Javascript", message: "Error: <%= error.message %>" }))) // error masage
        .pipe(
        app.plugins.gulpif(
            app.isBuild == true,
            app.plugins.webpack({ mode: 'production', output: { filename: 'app.min.js' } })
        ))
        .pipe(
            app.plugins.gulpif(
                app.isBuild == false,
                app.plugins.webpack({ mode: 'development', output: { filename: 'app.min.js' } })
            ))
        .pipe(app.gulp.dest(app.path.build.js))
        .pipe(app.plugins.browserSync.stream()) // server
}

export const javascript_other = () => {
    return app.gulp.src(app.path.src.js_other, { sourcemaps: true })
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(app.gulp.dest(app.path.build.js_other))
        .pipe(app.plugins.browserSync.stream()) // server
}