var gulp = require('gulp');


var bowerFiles = require('main-bower-files');
var browserSync = require('browser-sync').create();
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var es = require('event-stream');
var inject = require('gulp-inject');
var jshint = require('gulp-jshint');
var ngAnnotate = require('gulp-ng-annotate');
var ngmin = require('gulp-ngmin');
var reload = browserSync.reload;
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var debug = require('gulp-debug');

var flatten = require('gulp-flatten');

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

//Delete the dist directory
gulp.task('clean', function() {
	return gulp.src(bases.dist)
		.pipe(clean());
});

//Compile our Sass
gulp.task('sass', ['clean'], function() {
	return gulp.src(paths.sass)
		.pipe(sass())
		.pipe(gulp.dest(bases.dist + 'css'));
});

//Inject our dependencies in index.html
gulp.task('inject', ['copy', 'scripts', 'sass'], function() {
	var target = gulp.src(bases.dist + 'index.html');
	var sources = gulp.src(['./dist/' + '**/*.js', bases.dist + '**/*.css']);
	return target
		.pipe(inject(gulp.src(bowerFiles(), {read: false}), {name: 'bower', relative: true}))
		.pipe(inject(sources, {ignorePath: 'dist/'}))
		.pipe(gulp.dest('./dist'))
});

//Process scripts and concatenate them into one output file
gulp.task('scripts',['clean'], function() {
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

gulp.task('browser-reload', ['inject'], function() {
	browserSync.reload();
});

gulp.task('serve', ['inject'], function() {
	browserSync.init({
		startPath: '/',
		server: {
			baseDir: bases.dist,
			routes: {'/bower_components': 'bower_components'}
		}
	});

	gulp.watch(bases.client + '**/*.js', ['browser-reload']);
	gulp.watch(bases.client + '**/*.scss', ['browser-reload']);
	gulp.watch(bases.client + '**/*.html', ['browser-reload']);

});

//Copy all other files to dist directly
gulp.task('copy',['clean'], function() {

	//Copy html
	gulp.src(paths.html)
		.pipe(gulp.dest(bases.dist));

	//Copy fonts
	gulp.src(paths.ttf)
		.pipe(gulp.dest(bases.dist));
});

//A development task to run anytime a file changes
//gulp.task('watch', function() {
//	gulp.watch(bases.client + '**/*.js', ['browser-reload']);
//	gulp.watch(bases.client + '**/*.scss', ['browser-reload']);
//	gulp.watch(bases.client + '**/*.html', ['browser-reload']);
//});

gulp.task('default', ['clean', 'sass', 'scripts', 'copy', 'inject', 'watch', 'serve', 'browser-reload']);