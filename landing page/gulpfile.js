const gulp			=	require('gulp');
const sass 			=	require('gulp-sass');
const cssnano		=	require('gulp-cssnano');
const autoprefixer	=	require('gulp-autoprefixer');
const pug			=	require('gulp-pug');
const htmlmin		=	require('gulp-htmlmin');
const rename		=	require('gulp-rename');
const notify		=	require('gulp-notify');
const concat		=	require('gulp-concat');
const imagemin		= 	require('gulp-imagemin');
const uglify		= 	require('gulp-uglify');
const browserSync 	=	require('browser-sync').create();

const path = {
	css 		: 	'src/scss/**/*.*',
	cssLib		:	'src/libs/bootstrap/dist/css/bootstrap.min.css',
	home 		:	'src/*.*',
	partials	:	'src/partials/**/*.*',
	views		:	'src/views/**/*.*',
	bower_fonts	:	'src/libs/bootstrap/**/*.{ttf,woff,eof,svg}',
	js			: 	'src/js/**/*.*',
	jsLib		:	'src/libs/bootstrap/dist/js/bootstrap.min.js',
	jquery		:	'src/libs/jquery/dist/jquery.min.js',
	images		:	'src/images/**/*.*'
}

//Segundo un 'gulp' para levantar el server y live-reload(watch)
gulp.task('default',['serve','watch'])

//Primero 'gulp-build' Para procesar todo lo que tengamos(comprimir images)
gulp.task('build',['sass','libCSS','js','libJquery','libJS',
				   'index','partial','view',
				   'fonts','image'])

gulp.task('serve',['sass'],()=>{
	browserSync.init({
		server: "./dist"
	});
})

gulp.task('watch',()=>{
	gulp.watch(path.css,['sass']);
	//gulp.watch(path.cssLib,['libCSS']);
	gulp.watch('dist/*.html').on('change',browserSync.reload);
	gulp.watch(path.home,['index']);
	gulp.watch(path.partials,['partial']);
	gulp.watch(path.views,['view']);
	gulp.watch(path.js,['js']).on('change',browserSync.reload);
})

gulp.task('sass',()=>{
	return gulp.src(path.css)
		.pipe(sass())
		.pipe(concat('style.css'))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(cssnano())
		.pipe(autoprefixer({
			browsers:	['last 10 versions'],
			cascade	:	false
		}))
		.pipe(gulp.dest('dist/css'))
		.pipe(notify({ message: 'Gulp - Cambio Realizado' }))
		.pipe(browserSync.stream());
})

gulp.task('libCSS',()=>{
	return gulp.src(path.cssLib)
		.pipe(gulp.dest('dist/css'))
		.pipe(browserSync.stream());
})

gulp.task('js',()=>{
	return gulp.src(path.js)
		.pipe(concat('script.js'))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'))
		.pipe(browserSync.stream());
})

gulp.task('libJquery',()=>{
	return gulp.src(path.jquery)
		.pipe(gulp.dest('dist/js'))
		.pipe(browserSync.stream());
})

gulp.task('libJS',()=>{
	return gulp.src(path.jsLib)
		.pipe(gulp.dest('dist/js'))
		.pipe(browserSync.stream());
})

gulp.task('index',()=>{
	return gulp.src(path.home)
		.pipe(pug({
			pretty: true
		}))
		.pipe(htmlmin({
			collapseWhitespace: true
		}))
		.pipe(gulp.dest('dist'))
		.pipe(browserSync.stream());
})

gulp.task('fonts',()=>{
	return gulp.src(path.bower_fonts)
		.pipe(rename({
			dirname : '/fonts'
		}))
		.pipe(gulp.dest('dist'));
})

gulp.task('partial',()=>{
	return gulp.src(path.partials)
		.pipe(pug({
			pretty: true
		}))
		.pipe(htmlmin({
			collapseWhitespace: true
		}))
		.pipe(gulp.dest('dist/partials'))
		.pipe(browserSync.stream());
})

gulp.task('view',()=>{
	return gulp.src(path.views)
		.pipe(pug({
			pretty: true
		}))
		.pipe(htmlmin({
			collapseWhitespace: true
		}))
		.pipe(gulp.dest('dist/views'))
		.pipe(browserSync.stream())
})

gulp.task('image',()=>{
	gulp.src(path.images)
		.pipe(imagemin())
		.pipe(gulp.dest('dist/images'))
})