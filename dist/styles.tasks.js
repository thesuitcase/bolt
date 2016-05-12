'use strict';

var _bolt = require('./bolt');

var _bolt2 = _interopRequireDefault(_bolt);

var _state = require('./state');

var _state2 = _interopRequireDefault(_state);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _gulpSass = require('gulp-sass');

var _gulpSass2 = _interopRequireDefault(_gulpSass);

var _gulpCssnano = require('gulp-cssnano');

var _gulpCssnano2 = _interopRequireDefault(_gulpCssnano);

var _gulpFlatten = require('gulp-flatten');

var _gulpFlatten2 = _interopRequireDefault(_gulpFlatten);

var _gulpRename = require('gulp-rename');

var _gulpRename2 = _interopRequireDefault(_gulpRename);

var _gulpAutoprefixer = require('gulp-autoprefixer');

var _gulpAutoprefixer2 = _interopRequireDefault(_gulpAutoprefixer);

var _gulpHeader = require('gulp-header');

var _gulpHeader2 = _interopRequireDefault(_gulpHeader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Load package

// Styles.
var Package = require(process.env.PWD + '/package.json');

// Empty the output directory.
_bolt2.default.task('styles:build', function (bolt, paths, state) {
  var stream = bolt.src(_path2.default.join(paths.input, paths.styles.input) + '/**/*.scss');
  var taskState = state.styles[state.mode];

  if (taskState.sass) {
    stream = stream.pipe((0, _gulpSass2.default)(taskState.sass));
  }

  if (taskState.flatten) {
    stream = stream.pipe((0, _gulpFlatten2.default)());
  }

  if (taskState.prexif) {
    stream = stream.prefix((0, _gulpAutoprefixer2.default)(taskState.prefix));
  }

  if (taskState.header) {
    stream = stream.pipe((0, _gulpHeader2.default)(state.headers.full, { package: Package }));
  }

  stream = stream.pipe(bolt.dest(_path2.default.join(paths.output, paths.styles.output)));

  if (!taskState.minify) {
    return stream;
  }

  stream = stream.pipe((0, _gulpCssnano2.default)(taskState.minify));
  stream = stream.pipe((0, _gulpRename2.default)({ suffix: '.min' }));

  stream = stream.pipe(bolt.dest(_path2.default.join(paths.output, paths.styles.output)));

  return stream;
});