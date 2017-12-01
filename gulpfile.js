/*******************************
 **        Requirements        **
 *******************************/

/* Clean public folder */
var del = require('del');

/* Gulp essentials */
var gulp = require('gulp');
var minifyCSS = require('gulp-csso');
var sass = require('gulp-sass');
var pug = require('gulp-pug2');
var  concat  =  require('gulp-concat');
var minify = require('gulp-minify');
var bower = require("gulp-bower");
var gutil = require('gulp-util');
var s3 = require("gulp-s3-ls");

/* Webserver essentials */
var path = require("path");
var browserSync = require("browser-sync");

/*******************************
 **        Configuration       **
 *******************************/

var env = 'dev';


if (['build-preprod', 'build-prod', 'build-dev'].indexOf(gutil.env._[0]) !== -1) {
    env = gutil.env._[0].replace(/^build-/, '');
} else if (['preprod', 'prod', 'dev'].indexOf(gutil.env._[0]) !== -1) {
    env = gutil.env._[0];
} else if (gutil.env._[0] == 'build') {
    env = process.env.APP_ENV ? process.env.APP_ENV : 'dev';
}

var paths = [
    "./bower_components/jquery/dist/jquery.min.js",
    "./bower_components/angular/angular.js",
    "./bower_components/bootstrap/dist/js/bootstrap.min.js",

    "./bower_components/crypto-js/core.js",
    "./bower_components/crypto-js/md5.js",

    "./bower_components/angular-animate/angular-animate.min.js",
    "./bower_components/angular-aria/angular-aria.min.js",
    "./bower_components/AngularJS-Toaster/toaster.min.js",
    "./bower_components/satellizer/dist/satellizer.min.js",
    "./bower_components/angular-ui-router/release/angular-ui-router.min.js",
    "./bower_components/angular-ui-router-anim-in-out/anim-in-out.js",
    "./bower_components/angular-carousel/dist/angular-carousel.min.js",
    "./bower_components/angular-touch/angular-touch.min.js",
    "./bower_components/angular-bootstrap-colorpicker/js/bootstrap-colorpicker-module.min.js",
    "./bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js",
    "./bower_components/angucomplete-alt/dist/angucomplete-alt.min.js",
    "./bower_components/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js",
    "./bower_components/ng-scrollbars/dist/scrollbars.min.js",
    "./bower_components/clipboard/dist/clipboard.min.js",
    "./bower_components/ngclipboard/dist/ngclipboard.min.js",
    "./bower_components/angular-ui-select/dist/select.min.js",
    "./bower_components/angular-sanitize/angular-sanitize.min.js",

    "./bower_components/jquery-bridget/jquery-bridget.js",
    "./bower_components/ev-emitter/ev-emitter.js",
    "./bower_components/desandro-matches-selector/matches-selector.js",
    "./bower_components/fizzy-ui-utils/utils.js",
    "./bower_components/get-size/get-size.js",
    "./bower_components/outlayer/item.js",
    "./bower_components/outlayer/outlayer.js",
    "./bower_components/imagesloaded/imagesloaded.js",
    "./bower_components/underscore/underscore-min.js",
    "./bower_components/huebee/dist/huebee.pkgd.min.js",

    './src/js/angular/app_run.js',
    './src/js/angular/app_config.js',
    './src/js/angular/constants/constants-' + env + '.js',
    './src/js/angular/filters/**/*.js',
    './src/js/angular/factories/**/*.js',
    './src/js/angular/directives/**/*.js',
    './src/js/angular/controllers/**/*.js',
];

/*******************************
 **            Tasks           **
 *******************************/
/* Clean tasks */
gulp.task('clean', ['del'],  function()  {
    del(['./bower_components/'])
        .then(paths => {});
});

/* Install && Update tasks */
gulp.task('update', ['del'], function() {
    return bower();
});
gulp.task('install', ['update']);


/* General tasks */
gulp.task('del',  function()  {
    del(['./public/'])
        .then(paths => {});
});


gulp.task('css', ['install'], function() {
    return gulp.src([
            "./bower_components/bootstrap/dist/css/bootstrap.css",
            "./bower_components/AngularJS-Toaster/toaster.css",
            "./bower_components/angular-ui-router-anim-in-out/css/anim-in-out.css",
            "./bower_components/angular-carousel/dist/angular-carousel.css",
            "./bower_components/components-font-awesome/css/font-awesome.css",
            "./bower_components/angular-bootstrap-colorpicker/css/colorpicker.css",
            "./bower_components/angular-ui-select/dist/select.css",
            './bower_components/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css',
            "./bower_components/huebee/dist/huebee.css",
            "./bower_components/angular-ui-select/dist/select.css",

            "./src/css/**/*.scss"
        ])
        .pipe(sass())
        .pipe(minifyCSS())
        .pipe(concat('style.css'))
        .pipe(gulp.dest('./public/css'))
});

gulp.task('pug', ['install'], function() {
    return gulp.src('./src/pug/**/*.pug')
        .pipe(pug({
            yourTemplate: 'Locals'
        }))
        .pipe(gulp.dest('./public'));
});

gulp.task('html', ['install'], function() {
    return gulp.src(['./src/html/**/*.html'])
        .pipe(gulp.dest('./public'));
});

gulp.task('html-dev', ['install'], function() {
    return gulp.src(['./src/html/*-dev.html'])
        .pipe(gulp.dest('./public'));
});

gulp.task('fonts', ['install'], function() {
    return gulp.src(['./bower_components/components-font-awesome/fonts/**/*.*'])
        .pipe(gulp.dest('./public/fonts'));
});

gulp.task('images', ['install'], function() {
    return gulp.src(['./src/images/**/*.*'])
        .pipe(gulp.dest('./public/images'));
});

gulp.task('js', ['install'], function()  {
    return gulp.src(paths)
        .pipe(concat('script.js'))
        .pipe(gulp.dest("./public/js/"));
});

gulp.task('widget', ['install'], function() {
    return gulp.src(['./src/js/widget/widgetEngine.js'])
        .pipe(gulp.dest("./public"));
});

gulp.task('js-minify', ['js'], function() {
    return gulp.src(paths)
        .pipe(minify({
            ext: {
                src: '.js',
                min: '.js'
            },
            exclude: ['tasks'],
            ignoreFiles: []
        }))
});

gulp.task('widget-minify', ['widget'], function() {
    return gulp.src(['./src/js/widget/widgetEngine.js'])
        .pipe(minify({
            ext: {
                src: '.js',
                min: '.js'
            },
            exclude: ['tasks'],
            ignoreFiles: []
        }))
        .pipe(gulp.dest("./public"))
});

/* Debug task */
gulp.task("server", ['css', 'pug', 'fonts', 'images', 'html', 'js-' + env, 'widget-' + env], function() {
    browserSync({
        files: ["css/*.css", "js/*.js", "images/*.*", "index.html", "view_partials/**/*.html"],
        server: {
            baseDir: "./public/"
        }
    });
});

gulp.task("aws-s3-send", ['widget', 'widget-minify'], function() {
    var awsConfig = {
        "key": process.env.AWS_ACCESS_KEY_ID,
        "secret": process.env.AWS_SECRET_ACCESS_KEY,
        "bucket": process.env.AWS_S3_BUCKET
    };

    var awsOptions = {
        headers: {
            'x-amz-acl': 'public-read',
            'Content-type': 'application/javascript'
        },
        uploadPath: 'widget/'
    };

    gulp.src(['./public/widgetEngine.js'])
        .pipe(s3(awsConfig, awsOptions));
});


/* Env-specific tasks */

gulp.task('js-dev', ['js']);
gulp.task('js-preprod', ['js', 'js-minify']);
gulp.task('js-prod', ['js', 'js-minify']);

gulp.task('widget-dev',['widget']);
gulp.task('widget-preprod', ['widget', 'widget-minify', 'aws-s3-send']);
gulp.task('widget-prod', ['widget', 'widget-minify', 'aws-s3-send']);

/* Build tasks */

gulp.task('build', ['css', 'pug', 'fonts', 'images', 'html', 'widget-' + env, 'js-' + env]);
gulp.task('build-dev', ['css', 'pug', 'fonts', 'images', 'html', 'widget-dev', 'js-dev']);
gulp.task('build-preprod', ['css', 'pug', 'fonts', 'images', 'html', 'widget-preprod', 'js-preprod']);
gulp.task('build-prod', ['css', 'pug', 'fonts', 'images', 'html', 'widget-prod', 'js-prod']);

gulp.task('dev', ['build-dev', 'html-dev', 'server']);
gulp.task('preprod', ['build-preprod', 'html-dev', 'server']);
gulp.task('prod', ['build-prod', 'server']);
