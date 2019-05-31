/* eslint-disable no-implicit-globals */

// Node modules
const { src, dest, parallel } = require('gulp')
var gp_bump = require('gulp-bump')
var gp_clean = require('gulp-clean')
var gp_concat = require('gulp-concat')
var gp_rename = require('gulp-rename')
var gp_replace = require('gulp-replace')
var manifest = require('./src/manifest.json')

// Bump package.json version
var bump_package = function () {
  return src([ './package.json' ])
  .pipe(gp_bump({
    type: 'patch'
  }))
  .pipe(dest('./'))
}

// Bump manifest.json version
var bump_manifest = function() {
  return src([ 'src/manifest.json' ])
  .pipe(gp_bump({
    type: 'patch'
  }))
  .pipe(dest('src'))
}

// Clean build directory
var clean = function() {
  return src('build', {
    // read: false
  })
  .pipe(gp_clean())
}

// Copy manifest.json
var assets_manifest = function() {
  return src('src/manifest.json')
  .pipe(dest('build'))
}

// Copy icons
var assets_icons = function() {
  return src('src/icons/*')
  .pipe(dest('build/icons'))
}

// Build app JS
var js = function() {
  return src([
    'src/js/get-assets.js',
    'src/js/get-summary.js'
  ])
  .pipe(dest('build/js'))
}

// Build background.js
var background_js = function() {
  return src([
    'src/js/background.js'
  ])
  .pipe(gp_replace('var planning_portals = []', function(match) {
    var planning_portals = manifest.content_scripts[0].matches
    console.timeLog(planning_portals)
    return match.substr(0, match.length - 1) + '\n  \'' + planning_portals.join('\',\n  \'') + '\'\n]'
  }))
  .pipe(dest('build/js'))
}

// Build vendor JS
var vendor_js = function() {
  return src([
    'node_modules/jquery/dist/jquery.min.js'
  ])
  .pipe(gp_concat('concat.js'))
  .pipe(gp_rename('vendor.js'))
  .pipe(dest('build/js'))
}

exports.bump = parallel(bump_package, bump_manifest)
exports.clean = clean
exports.build = parallel(assets_manifest, assets_icons, js, background_js, vendor_js)
exports.default = exports.build
