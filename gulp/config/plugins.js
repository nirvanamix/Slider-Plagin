import { deleteAsync } from 'del';
import replace from 'gulp-replace';
import rename from 'gulp-rename';
// html plagins
import fileinclude from 'gulp-file-include';
import webpHTML from 'gulp-webp-html-nosvg';
import versionNumber from 'gulp-version-number';
import htmlmin from  'gulp-htmlmin';
// eroor plugins
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
// brouser sun
import browserSync from 'browser-sync';
//css
import autoprefixer from 'gulp-autoprefixer';
import webpCss from 'gulp-webp-css';
// js
import webpack from 'webpack-stream';
import minify from 'gulp-minify';
// svg sprite
import svgmin from 'gulp-svgmin';
import svg_sprite from 'gulp-svg-sprite';
import cheerio from 'gulp-cheerio';
// images
import webp from 'gulp-webp';
import imagemin from 'gulp-imagemin';
import newer from 'gulp-newer'; // do not update existing pictures
// gulp if
import gulpif from 'gulp-if'; 
// zip file
import zipPlugin from 'gulp-zip';
// ftp
import vinylFTP from 'vinyl-ftp';
import util from 'gulp-util';
/*---------------------- End html plagins -----------------------*/
export const plugins = {
    deleteAsync,
    fileinclude,
    replace,
    webpHTML,
    versionNumber,
    htmlmin,
    plumber,
    notify,
    browserSync,
    autoprefixer,
    rename,
    webpCss,
    webpack,
    minify,
    svgmin,
    svg_sprite,
    cheerio,
    webp,
    imagemin,
    newer,
    gulpif,
    zipPlugin,
    vinylFTP,
    util
}