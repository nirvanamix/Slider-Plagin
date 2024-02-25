export const zip = () => {
    app.plugins.deleteAsync(`/${app.path.rootFloder}.zip`);
    return app.gulp.src([`./**/*.*`, `!./node_modules/**/*.*`] , {})
        .pipe(app.plugins.plumber( app.plugins.notify.onError({ title: "ZIP", message: "Error: <%= error.message %>" })))
        .pipe(app.plugins.zipPlugin(`${app.path.rootFolder}.zip`))
        .pipe(app.gulp.dest('./'))
}