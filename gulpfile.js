// PATHS
var basePaths = {
    src: 'app/',
    dest: 'dist/',
    bower: 'bower_components/'
};
var paths = {
    scripts: {
        src: basePaths.src + 'js/**/*.js',
        dest: basePaths.dest + 'js/min/' //unused.
    },
    styles: {
        src: basePaths.src + 'sass/**/*.scss',
        dest: basePaths.dest + 'css/min/' //unused.
    },
    templates: {
        src: basePaths.src + 'partials/**/*.html',
        dest: basePaths.dest + 'partials/'
    }
};
var vendorFiles = {
    styles: '',
    scripts: ''
};

// FIRES ON FILE CHANGE.
var changeEvent = function(evt) {
    gutil.log('\n\nFile', gutil.colors.cyan(evt.path.replace(new RegExp('/.*(?=/' + basePaths.src + ')/'), '')), 'was', gutil.colors.magenta(evt.type)+', running tasks...');
};


var gulp = require('gulp');
var es = require('event-stream');
var gutil = require('gulp-util');

//Searches for gulp plugins starting with [gulp] or [gulp-] in package.json and loads them into this obj.
var plugins = require("gulp-load-plugins")({
    pattern: ['gulp-*', 'gulp.*'],
    replaceString: /\bgulp[\-.]/
});

// Allows gulp --dev to be run for a more verbose output
var isProduction = true;
var sassStyle = 'compressed';
var sourceMap = false;

if(gutil.env.dev === true) {
    sassStyle = 'expanded';
    sourceMap = true;
    isProduction = false;
}

//#########################################
//################ TASKS ##################
//#########################################

//Move html templates to dist, this is for easy reference in main.js
gulp.task('copy', function () {
    gulp.src([paths.templates.src])
        .pipe(gulp.dest(paths.templates.dest));
});

// Lint JS
gulp.task('lint', function() {
  return gulp.src(paths.scripts.src + '/**/*.js')
    .pipe(plugins.jshint('.jshintrc'))
    .pipe(plugins.jshint.reporter('jshint-stylish'));
});

// Concat & Minify JS
gulp.task('scripts', function(){
  return gulp.src(paths.scripts.src)
    .pipe(isProduction ? plugins.concat('main.min.js') : plugins.concat('main.js'))
    .pipe(gulp.dest(basePaths.dest))
    .pipe(isProduction ? plugins.uglify() : gutil.noop())
    .pipe(plugins.size())
    .pipe(gulp.dest(basePaths.dest));
});

gulp.task('css', function(){

    var sassFiles = gulp.src('app/sass/main.scss')
    .pipe(plugins.rubySass({
        style: sassStyle, sourcemap: sourceMap, precision: 2
    }))
    .on('error', function(err){
        new gutil.PluginError('CSS', err, {showStack: true});
    });

    return es.concat(gulp.src(vendorFiles.styles), sassFiles)
        .pipe(isProduction ? plugins.concat('style.min.css') : plugins.concat('style.css'))
        .pipe(plugins.autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
        .pipe(isProduction ? plugins.combineMediaQueries({
            log: true
        }) : gutil.noop())
        .pipe(isProduction ? plugins.cssmin() : gutil.noop())
        .pipe(plugins.size())
        .pipe(gulp.dest(basePaths.dest));
});

// Watch Our Files
gulp.task('watch', function() {
    gulp.watch(paths.scripts.src, ['lint', 'scripts']).on('change', function(evt) {
        changeEvent(evt);
    });
    gulp.watch(paths.styles.src, ['css']).on('change', function(evt) {
        changeEvent(evt);
    });
    gulp.watch(['app/index.html', paths.templates.src], ['copy']).on('change', function(evt) {
        changeEvent(evt);
    });
});


// Default
gulp.task('default', ['copy', 'lint', 'scripts', /*'css',*/ 'watch']);
