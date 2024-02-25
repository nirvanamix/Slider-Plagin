export const svg_sprite = () => {
    return app.gulp.src(app.path.src.svg_sprite)
        .pipe(app.plugins.plumber(app.plugins.notify.onError({ title: "SVG SPRITE", message: "Error: <%= error.message %>" }))) // error masage
        .pipe(app.plugins.svgmin())
        .pipe(
			app.plugins.cheerio({
			run: function($) {
					$('[fill]').removeAttr('fill');
					$('[stroke]').removeAttr('stroke');
					$('[style]').removeAttr('style');
				},
				parserOptions: {xmlMode: true}
			})
		)
		.pipe(app.plugins.replace('&gt;', '>'))
		.pipe(app.plugins.svg_sprite({
			mode: {
				stack: {
					sprite: `./svg_sprite.svg`,
					example: true
				}
			}
		}))
        .pipe(app.gulp.dest(app.path.build.svg_sprite))
        .pipe(app.plugins.browserSync.stream()) // server
}