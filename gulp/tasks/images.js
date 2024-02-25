export const images = () => {
    return app.gulp.src(app.path.src.images)
        .pipe(app.plugins.plumber(app.plugins.notify.onError({ title: "IMAGES", message: "Error: <%= error.message %>" }))) // error masage
        .pipe(app.plugins.newer(app.path.build.images))
        .pipe( // minimize and optimize images
                app.plugins.gulpif(
                    app.isBuild == true && flag.minImages == true,
                        app.plugins. imagemin({ progressive: true, svgoPlugins: [{ removeViewBox: false }], interlaced: true, optimizationLevel: 3 /* 0 to 7*/ })
                ))
        .pipe(app.gulp.dest(app.path.build.images))
        // webp
        .pipe(app.plugins.gulpif(
            app.isBuild == true && flag.webp == true,
                app.plugins.webp()))
        .pipe(app.plugins.gulpif(
            app.isBuild == true && flag.webp == true,
                app.plugins.newer(app.path.build.images)))
        .pipe(app.plugins.gulpif(
            app.isBuild == true && flag.webp == true,
                app.gulp.dest(app.path.build.images)))
        // copy svg
        .pipe(app.gulp.src(app.path.src.imagesSvg))
        .pipe(app.plugins.newer(app.path.build.images))
        .pipe(app.gulp.dest(app.path.build.images))
        .pipe(app.plugins.browserSync.stream()) // server
}