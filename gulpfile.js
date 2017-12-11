'use strict';

var os 			= require('os');
var gulp 		= require('gulp');
var rename		= require('gulp-rename');
var php 		= require('gulp-connect-php');
var browserSync = require('browser-sync');
var browserInit = browserSync.create();
var phantom 	= require('phantom');   
var shell 		= require('shelljs');

var browser 	=
	(os.platform() == 'linux') ?
	('google-chrome') :
	((os.platform() == 'darwin') ?
	('google chrome') :
	((os.platform() == 'win32') ?
	// ('firefox') : ('chrome')))
	('chrome') : ('firefox')))
;

gulp.task('html', function() {
	return gulp
		.src('public/*.html')
		.pipe(browserInit.reload({ stream: true }))
	;
});

gulp.task('templates', function() {
	return gulp
		.src('public/templates/*.html')
		.pipe(browserInit.reload({ stream: true }))
	;
});

gulp.task('js', function() {
	return gulp
		.src('public/js/*.js')
		.pipe(browserInit.reload({
			stream: true
		}))
	;
});

gulp.task('css', function() {
	return gulp
		.src('public/css/*.css')
		.pipe(browserInit.reload({
			stream: true
		}))
	;
});

gulp.task('app', function() {
	return gulp
		.src('public/app/*.json')
		.pipe(browserInit.reload({
			stream: true
		}))
	;
});

gulp.task('php', function() {
	return gulp
		.src('private/*.php')
		.pipe(browserInit.reload({
			stream: true
		}))
	;
});

gulp.task('watch', ['html', 'templates', 'app', 'css', 'js', 'php'], function() {
	gulp.watch(['./public/js/*.js', './public/js/**/*.js'], ['js']);
	gulp.watch(['./public/css/*.css'], ['css']);
	gulp.watch(['./public/*.html'], ['html']);
	gulp.watch(['./public/templates/*.html'], ['templates']);
	gulp.watch(['./public/app/*.json'], ['app']);
	gulp.watch(['./private/*.php'], ['php']);
	return gulp;
});

gulp.task('export', function() {
	phantom.create().then(function(ph) {
		ph.createPage().then(function(page) {
			page.property('viewportSize', { width: 595, height: 842 }).then(function() {
				page.property('paperSize', { width: 595 * 1.55, height: 842 * 1.75 }).then(function() { // width: 2480 / 3, height: 800
					page.open('public/index.html').then(function(status) {
						setTimeout(function() {
							page.render('export/cv.pdf').then(function() {
								console.log('Page Rendered');
								ph.exit();
							});
						}, 2000);
					});
				});
			});
		});
	});
	return gulp;
});

gulp.task('lib', function() {
	gulp.src('./node_modules/jquery/dist/jquery.min.js').pipe(gulp.dest('./public/lib/jquery'));
	gulp.src('./node_modules/semantic-ui/dist/**').pipe(gulp.dest('./public/lib/semantic'));
	gulp.src('./node_modules/angular/*').pipe(gulp.dest('./public/lib/angular'));
	gulp.src('./node_modules/angular-i18n/*').pipe(gulp.dest('./public/lib/angular-i18n'));
	gulp.src('./node_modules/angular-ui-router/release/*').pipe(gulp.dest('./public/lib/angular-ui-router'));
	gulp.src('./node_modules/angulartics/dist/*').pipe(gulp.dest('./public/lib/angulartics'));
	gulp.src('./node_modules/angulartics-google-analytics/dist/*').pipe(gulp.dest('./public/lib/angulartics-google-analytics'));
	gulp.src('./node_modules/oclazyload/dist/*').pipe(gulp.dest('./public/lib/oclazyload'));
	return gulp;
});

gulp.task('init', ['lib'], function() {
	var mode = process.env.NODE_ENV || 'dev';
	if (mode == 'dev') {
		gulp
			.src('./public/app/config/config_dev.json')
			.pipe(rename('./public/app/config.json'))
			.pipe(gulp.dest('./'))
		;
		return gulp;
	}
	gulp
		.src('./public/app/config/config_prod.json')
		.pipe(rename('./public/app/config.json'))
		.pipe(gulp.dest('./'))
	;
	return gulp;
});

gulp.task('serve', ['watch'], function() {
	browserInit.init({
		server: {
			baseDir: 'public/',
		},
		browser: browser,
	});
});

gulp.task('backend', ['watch'], function() {
	var pathPhpExe = process.env.PHP_EXE || shell.exec('where php.exe').stdout.replace(/(?:\r\n|\r|\n)/g, '');
	var pathPhpIni = process.env.PHP_INI || shell.exec('where php.ini').stdout.replace(/(?:\r\n|\r|\n)/g, '');
	php.server({
		hostname: '0.0.0.0',
		bin: pathPhpExe,
		ini: pathPhpIni,
		base: 'private/',
	}, function() {
		browserSync({
			proxy: '127.0.0.1:8000',
			browser: browser,
		});
	});
});

gulp.task('default', function() {
	console.log('Please follow the README.md file, thank you.');
});