// Core modules
var ver = require('./package.json').version

// Node modules
const { src, dest, series, parallel } = require('gulp')
var gp_bump = require('gulp-bump')
var gp_clean = require('gulp-clean')
var gp_concat = require('gulp-concat')
var gp_rename = require('gulp-rename')

// Bump package.json version
bump_package = function() {
  return src(['./package.json'])
  .pipe(gp_bump({
    type: 'patch'
  }))
  .pipe(dest('./'))
}

// Bump manifest.json version
bump_manifest = function() {
  return src(['src/manifest.json'])
  .pipe(gp_bump({
    type: 'patch'
  }))
  .pipe(dest('src'))
}

// Clean build directory
 clean = function() {
  return src('build', {
    // read: false
  })
  .pipe(gp_clean())
}

// Copy manifest.json
assets_manifest = function() {
  return src('src/manifest.json')
  .pipe(dest('build'))
}

// Copy icons
assets_icons = function() {
  return src('src/icons/*')
  .pipe(dest('build/icons'))
}

// Build app JS
js = function() {
  return src([
    'src/js/get-assets.js',
    'src/js/get-summary.js',
    'src/js/background.js'
  ])
  .pipe(dest('build/js'))
}

// Build vendor JS
vendor_js = function(cb) {
  return src([
    'node_modules/jquery/dist/jquery.min.js'
  ])
  .pipe(gp_concat('concat.js'))
  .pipe(gp_rename('vendor.js'))
  .pipe(dest('build/js'))
}

exports.bump = parallel(bump_package, bump_manifest)
exports.clean = clean
exports.build = parallel(assets_manifest, assets_icons, js, vendor_js)
exports.default = exports.build