


exports.list = function *(next) {
	console.log('list');
	this.body = {data:[
        {_id: '342424', title: 'How to use a streaming JSON parser with Koa?'},
        {_id: '342425', title: 'Add a silent option'},
        {_id: '342425', title: 'adding support for specifying headers in ctx.onerror'},
        {_id: '342425', title: 'es7 async function feedback'},
    ]};
}

exports.addTopic = function *(next) {
	console.log('addTopic');
}

exports.find = function *(next) {
	console.log('find');
	this.body = {
		data: {
			title: 'node test',
			content: '<p align="center">\n' + 
'  <a href="http://gulpjs.com">\n' + 
'    <img height="257" width="114" src="https://raw.githubusercontent.com/gulpjs/artwork/master/gulp-2x.png">\n' + 
'  </a>\n' + 
'</p>\n' + 
'\n' + 
'# gulp\n' + 
'**The streaming build system**\n' + 
'\n' + 
'[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Support us][gittip-image]][gittip-url] [![Build Status][travis-image]][travis-url] [![Coveralls Status][coveralls-image]][coveralls-url] [![Gitter chat][gitter-image]][gitter-url]\n' + 
'\n' + 
'## Like what we do?\n' + 
'\n' + 
'[Support us via Gratipay](https://gratipay.com/WeAreFractal/)\n' + 
'\n' + 
'## Documentation\n' + 
'\n' + 
'For a Getting started guide, API docs, recipes, making a plugin, etc. see the [documentation page](/docs/README.md)!\n' + 
'\n' + 
'## Sample `gulpfile.js`\n' + 
'\n' + 
'This file is just a quick sample to give you a taste of what gulp does.\n' + 
'\n' + 
'```js\n' + 
'var gulp = require(\'gulp\');\n' + 
'var coffee = require(\'gulp-coffee\');\n' + 
'var concat = require(\'gulp-concat\');\n' + 
'var uglify = require(\'gulp-uglify\');\n' + 
'var imagemin = require(\'gulp-imagemin\');\n' + 
'var sourcemaps = require(\'gulp-sourcemaps\');\n' + 
'var del = require(\'del\');\n' + 
'\n' + 
'var paths = {\n' + 
'  scripts: [\'client/js/**/*.coffee\', \'!client/external/**/*.coffee\'],\n' + 
'  images: \'client/img/**/*\'\n' + 
'};\n' + 
'\n' + 
'// Not all tasks need to use streams\n' + 
'// A gulpfile is just another node program and you can use all packages available on npm\n' + 
'gulp.task(\'clean\', function(cb) {\n' + 
'  // You can use multiple globbing patterns as you would with `gulp.src`\n' + 
'  del([\'build\'], cb);\n' + 
'});\n' + 
'\n' + 
'gulp.task(\'scripts\', [\'clean\'], function() {\n' + 
'  // Minify and copy all JavaScript (except vendor scripts)\n' + 
'  // with sourcemaps all the way down\n' + 
'  return gulp.src(paths.scripts)\n' + 
'    .pipe(sourcemaps.init())\n' + 
'      .pipe(coffee())\n' + 
'      .pipe(uglify())\n' + 
'      .pipe(concat(\'all.min.js\'))\n' + 
'    .pipe(sourcemaps.write())\n' + 
'    .pipe(gulp.dest(\'build/js\'));\n' + 
'});\n' + 
'\n' + 
'// Copy all static images\n' + 
'gulp.task(\'images\', [\'clean\'], function() {\n' + 
'  return gulp.src(paths.images)\n' + 
'    // Pass in options to the task\n' + 
'    .pipe(imagemin({optimizationLevel: 5}))\n' + 
'    .pipe(gulp.dest(\'build/img\'));\n' + 
'});\n' + 
'\n' + 
'// Rerun the task when a file changes\n' + 
'gulp.task(\'watch\', function() {\n' + 
'  gulp.watch(paths.scripts, [\'scripts\']);\n' + 
'  gulp.watch(paths.images, [\'images\']);\n' + 
'});\n' + 
'\n' + 
'// The default task (called when you run `gulp` from cli)\n' + 
'gulp.task(\'default\', [\'watch\', \'scripts\', \'images\']);\n' + 
'```\n' + 
'\n' + 
'## Incremental Builds\n' + 
'\n' + 
'We recommend these plugins:\n' + 
'\n' + 
'- [gulp-changed](https://github.com/sindresorhus/gulp-changed) - only pass through changed files\n' + 
'- [gulp-cached](https://github.com/wearefractal/gulp-cached) - in-memory file cache, not for operation on sets of files\n' + 
'- [gulp-remember](https://github.com/ahaurw01/gulp-remember) - pairs nicely with gulp-cached\n' + 
'- [gulp-newer](https://github.com/tschaub/gulp-newer) - pass through newer source files only, supports many:1 source:dest\n' + 
'\n' + 
'## Want to contribute?\n' + 
'\n' + 
'Anyone can help make this project better - check out the [Contributing guide](/CONTRIBUTING.md)!\n' + 
'\n' + 
'\n' + 
'[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/wearefractal/gulp/trend.png)](https://bitdeli.com/free "Bitdeli Badge")\n' + 
'\n' + 
'[gittip-url]: https://www.gittip.com/WeAreFractal/\n' + 
'[gittip-image]: http://img.shields.io/gittip/WeAreFractal.svg\n' + 
'\n' + 
'[downloads-image]: http://img.shields.io/npm/dm/gulp.svg\n' + 
'[npm-url]: https://npmjs.org/package/gulp\n' + 
'[npm-image]: http://img.shields.io/npm/v/gulp.svg\n' + 
'\n' + 
'[travis-url]: https://travis-ci.org/gulpjs/gulp\n' + 
'[travis-image]: http://img.shields.io/travis/gulpjs/gulp.svg\n' + 
'\n' + 
'[coveralls-url]: https://coveralls.io/r/gulpjs/gulp\n' + 
'[coveralls-image]: http://img.shields.io/coveralls/gulpjs/gulp/master.svg\n' + 
'\n' + 
'[gitter-url]: https://gitter.im/gulpjs/gulp\n' + 
'[gitter-image]: https://badges.gitter.im/gulpjs/gulp.png\n' 
		}
	}
}


exports.update = function *(next) {
	console.log('update');
	yield next;
}