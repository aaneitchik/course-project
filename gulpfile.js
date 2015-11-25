var gulp = require('gulp');

var bowerFiles = require('main-bower-files');
var browserSync = require('browser-sync').create();
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var es = require('event-stream');
var flatten = require('gulp-flatten');
var inject = require('gulp-inject');
var jshint = require('gulp-jshint');
var ngAnnotate = require('gulp-ng-annotate');
var ngmin = require('gulp-ngmin');
var nodemon = require('gulp-nodemon');
var reload = browserSync.reload;
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var debug = require('gulp-debug');

var bases = {
    client: 'client/',
    dist: 'dist/',
    server: 'server/'
};

var paths = {
    sass: 'client/**/*.scss',
    scripts: 'client/**/*.js',
    html: 'client/**/*.html',
    ttf: 'client/**/*.ttf'
};

var port = 8000;

//Setup proxy to adress the server
var proxyMiddleware = require('http-proxy-middleware');
var proxy = proxyMiddleware('/api',
    {
        target: 'http://localhost:' + port,
        pathRewrite: {
            "/api": "/api"
        }
    });

//Delete the dist directory
gulp.task('clean', function () {
    return gulp.src(bases.dist)
        .pipe(clean());
});

//Compile our Sass
gulp.task('sass', ['clean'], function () {
    return gulp.src(paths.sass)
        .pipe(sass())
        .pipe(gulp.dest(bases.dist + 'css'));
});

//Inject our dependencies in index.html
gulp.task('inject', ['copy', 'scripts', 'sass'], function () {
    var target = gulp.src(bases.dist + 'index.html');
    var sources = gulp.src(['./dist/' + '**/*.js', bases.dist + '**/*.css']);
    return target
        .pipe(inject(gulp.src(bowerFiles(), {read: false}), {name: 'bower', relative: true}))
        .pipe(inject(sources, {ignorePath: 'dist/'}))
        .pipe(gulp.dest('./dist'))
});

//Process scripts and concatenate them into one output file
gulp.task('scripts', ['clean'], function () {
    return gulp.src(paths.scripts)
        .pipe(jshint())
        .pipe(jshint.reporter())
        .pipe(concat('app.js'))
        .pipe(ngAnnotate())
        .pipe(gulp.dest(bases.dist + 'scripts/'))
        .pipe(rename('app.min.js'))
        .pipe(ngmin())
        .pipe(uglify())
    //.pipe(gulp.dest(bases.dist + 'scripts/'));
});

//Reload browser on file change
gulp.task('browser-reload', ['server-reload'], function () {
    browserSync.reload();
});

//Init browserSync and watch files
gulp.task('serve', ['server-reload'], function () {
    browserSync.init({
        startPath: '/',
        server: {
            baseDir: bases.dist,
            middleware: [proxy],
            routes: {'/bower_components': 'bower_components'}
        }
    });

    gulp.watch(bases.client + '**/*.js', ['browser-reload']);
    gulp.watch(bases.client + '**/*.scss', ['browser-reload']);
    gulp.watch(bases.client + '**/*.html', ['browser-reload']);

});

//Copy all other files to dist directly
gulp.task('copy', ['clean'], function () {

    //Copy html
    gulp.src(paths.html)
        .pipe(gulp.dest(bases.dist));

    //Copy fonts
    gulp.src(paths.ttf)
        .pipe(gulp.dest(bases.dist));
});

//Reload server on js files change
gulp.task('server-reload', ['inject'], function (cb) {
    var started = false;
    return nodemon({
        script: './server.js',
        ext: 'js',
        env: {
            PORT: port
        },
        ignore: './node_modules/**'
    }).on('start', function () {
        // to avoid nodemon being started multiple times
        if (!started) {
            cb();
            started = true;
        }
    });
});

gulp.task('default', ['serve', 'browser-reload', 'server-reload']);