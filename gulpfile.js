// import tasks
import gulp from "gulp" // import gulp
import { path } from "./gulp/config/path.js"; // import path
import { plugins } from "./gulp/config/plugins.js"; // import plugins
import { copy } from "./gulp/tasks/copy.js"; // copy files
import { cleanFile } from "./gulp/tasks/reset.js"; // clean folder dist
import { html } from "./gulp/tasks/html.js" // html
import { server } from "./gulp/tasks/server.js" // server
import { scss } from "./gulp/tasks/scss.js" // scss
import { javascript, javascript_other } from "./gulp/tasks/js.js" // javascript
import { images } from "./gulp/tasks/images.js"; // images
import { fonts } from "./gulp/tasks/fonts.js" // fonts
import { svg_sprite } from "./gulp/tasks/svg_sprite.js";
import { zip } from "./gulp/tasks/zip.js";
import { ftp } from "./gulp/tasks/ftp.js"
// global varivels
global.app = { 
    gulp,
    path,
    plugins,
    isBuild: process.argv.includes('--build'),
    isDev: !process.argv.includes('--build'),
} 
global.flag = { // flags for run build
    webp: true, // all webp 
    versionNumber: true, // numbers version for js and css
    minImages: false, // minimize and optimize images
    minHTML: false // min html
}
// watchcher
function watcher(){
    gulp.watch(path.watch.files, copy);
    gulp.watch(path.watch.html, html);
    gulp.watch(path.watch.scss, scss);
    gulp.watch(path.watch.js, javascript);
    gulp.watch(path.watch.js_other, javascript_other);
    gulp.watch(path.watch.images, images);
    gulp.watch(path.watch.svg_sprite, svg_sprite);
    gulp.watch(path.watch.fonts, fonts);
}
//! main tasks
const mainTasks = gulp.parallel(copy, html, scss, javascript, javascript_other, images, svg_sprite,  fonts);
// mode developer
const dev = gulp.series(cleanFile, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(cleanFile, mainTasks);
const zipBuild = gulp.series(cleanFile, mainTasks, zip);
const ftpBuild = gulp.series(cleanFile, mainTasks, ftp);
export { dev, build, zipBuild, ftpBuild }
// tasks default
gulp.task('default', dev);



/*
    1) плагіни потрібно перетворити на фунації
        const deletedFilePaths = await deleteAsync(['temp/*.js', '!temp/unicorn.js']);
        export const cleanFile = async () => {return await app.plugins.deleteAsync([app.path.clean]);}
*/