export const html = () => {
    return app.gulp.src(app.path.src.html) // copy thml
        .pipe(app.plugins.plumber(app.plugins.notify.onError({title: "HTML", message: "Error: <%= error.message %>" }))) // error masage
        .pipe(app.plugins.fileinclude())
        .pipe(app.plugins.replace(/\.\.\//g, ``)) // remove ../ in html modules
        .pipe( // webp
            app.plugins.gulpif(
                app.isBuild == true && flag.webp == true,
                    app.plugins.webpHTML()))
        .pipe(  // number version for js and css
            app.plugins.gulpif(
                app.isBuild == true && flag.versionNumber == true,
                app.plugins.versionNumber({ 'value': '%DT%', 'append': { 'key': '_v', 'cover': 0, 'to': ['css', 'js'] }, 'output': { 'file': 'gulp/config/version.json' } })
            ))
        .pipe(
            app.plugins.gulpif(
                app.isBuild == true && flag.minHTML == true,
                app.plugins.htmlmin({ collapseWhitespace: true })))
        .pipe(app.gulp.dest(app.path.build.html)) // pass html
        .pipe(app.plugins.browserSync.stream()) // server
}