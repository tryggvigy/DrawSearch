/*jshint ignore: start*/

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
        dest: basePaths.dest + 'css/' //unused.
    },
    templates: {
        src: basePaths.src + 'partials/templates/*.html',
        dest: basePaths.dest + 'partials/templates'
    },
    directivesHTML: {
        src: basePaths.src + 'partials/directivesHTML/*.html',
        dest: basePaths.dest + 'partials/directivesHTML'
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
    gulp.src([paths.directivesHTML.src])
        .pipe(gulp.dest(paths.directivesHTML.dest));
    gulp.src([basePaths.src + 'static/**/*'])
        .pipe(gulp.dest(basePaths.dest + 'static/'));
});

// Lint JS
gulp.task('lint', function() {
  gulp.src([paths.scripts.src])
    .pipe(plugins.jshint('.jshintrc'))
    .pipe(plugins.jshint.reporter('jshint-stylish'));
});

// Concat & Minify JS
gulp.task('scripts', function(){
  gulp.src(paths.scripts.src)
    .pipe(isProduction ? plugins.concat('main.min.js') : plugins.concat('main.js'))
    .pipe(gulp.dest(basePaths.dest))
    .pipe(isProduction ? plugins.uglify() : gutil.noop())
    .pipe(plugins.size())
    .pipe(gulp.dest(basePaths.dest));
});

// Convert, Concat and Minify sass files -- UNUSED
gulp.task('css', function(){

    var sassFiles = gulp.src('app/sass/main.scss')
    .pipe(plugins.rubySass({
        style: sassStyle, sourcemap: sourceMap, precision: 2
    }))
    .on('error', function(err){
        new gutil.PluginError('CSS', err, {showStack: true});
    });
    return es.concat(gulp.src(vendorFiles.styles), sassFiles)
        .pipe(isProduction ? plugins.concat('css/main.min.css') : plugins.concat('css/main.css'))
        .pipe(plugins.autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
        .pipe(isProduction ? plugins.combineMediaQueries({
            log: true
        }) : gutil.noop())
        .pipe(isProduction ? plugins.cssmin() : gutil.noop())
        .pipe(plugins.size())
        .pipe(gulp.dest(basePaths.dest));
});

// Create the icon font from svg
var fontName = 'myfont';
gulp.task('iconfont', function(){
  gulp.src(['app/static/images/svg/*.svg'])
    .pipe(plugins.iconfontCss({
      fontName: fontName,
      targetPath: '../../../sass/base/_icons.scss',
      fontPath: '../static/fonts/Icons/'
    }))
    .pipe(plugins.iconfont({
      fontName: fontName
     }))
    .pipe(gulp.dest('app/static/fonts/Icons'));
});

// Watch Our Files
gulp.task('watch', function() {
    gulp.watch(paths.scripts.src, ['lint', 'scripts']).on('change', function(evt) {
        changeEvent(evt);
    });
    /*gulp.watch(paths.styles.src, ['css']).on('change', function(evt) {
        changeEvent(evt);
    });*/
    gulp.watch(['app/index.html', paths.templates.src], ['copy']).on('change', function(evt) {
        changeEvent(evt);
    });
});


// Default
gulp.task('default', ['copy', 'iconfont', 'scripts', 'lint', /*'css',*/ 'watch']);
