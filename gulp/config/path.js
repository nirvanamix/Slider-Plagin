import * as nodePath from 'path';
import { folderDeploy } from '../config/ftp.js';
const rootFolder = nodePath.basename(nodePath.resolve());
const buildFolder = `./dist`;
const srcFolder = `./src`;
export const path = {
    build: {
        files: `${buildFolder}/files/`,
        html: `${buildFolder}/`,
        addHtmlWebp: `${buildFolder}/*.html`,
        css: `${buildFolder}/css/`,
        js: `${buildFolder}/js/`,
        js_other: `${buildFolder}/js/`,
        images: `${buildFolder}/img/`,
        svg_sprite: `${buildFolder}/img/`,
        fonts: `${buildFolder}/fonts/`,
    },
    src: {
        files: `${srcFolder}/files/**/*.*`,
        html: `${srcFolder}/*.html`,
        htmlInclude: `${srcFolder}/html/*.html`,
        scss: `${srcFolder}/scss/style.scss`,
        js: `${srcFolder}/js/app.js`,
        js_other: [`${srcFolder}/js/**/*.*`, `!${srcFolder}/js/app.js`, `!${srcFolder}/js/modules/**/*.*`],
        images: [`${srcFolder}/img/**/*.*`, `!${srcFolder}/img/**/*.svg`],
            imagesSvg: [`${srcFolder}/img/**/*.svg`, `!${srcFolder}/img/svg_sprite/**/*.*`],
        svg_sprite: `${srcFolder}/img/svg_sprite/**/*.svg`,
        fonts: `${srcFolder}/fonts/**/*.*`,
    },
    watch: {
        html: `${srcFolder}/**/*.html`,
        files: `${srcFolder}/**/*.*`,
        scss: `${srcFolder}/scss/**/*.scss`,
        js: `${srcFolder}/js/**/*.*`,
        js_other: `${srcFolder}/js/**/*.*`,
        images: `${srcFolder}/img/**/*.*`,
        svg_sprite: `${srcFolder}/img/svg_sprite/**/*.*`,
        fonts: `${srcFolder}/fonts/**/*.*`,
    },
    clean: buildFolder,
    buildFolder: buildFolder,
    srcFolder: srcFolder,
    rootFolder: rootFolder,
    ftp: folderDeploy
}