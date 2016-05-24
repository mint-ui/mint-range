var cooking = require('cooking');
var webpack = require('webpack');

cooking.set({
  use: 'vue',
  entry: {
    'index': './src/entry.js',
    'index.min': './src/entry.js'
  },
  template: false,
  clean: true,
  format: 'umd',
  moduleName: 'ELEMENT_COMPONENT',
  extractCSS: 'index.css',
  extends: {
    vue: true,
    lint: true,
    saladcss: {
      features: {
        bem: { style: 'bem' }
      }
    }
  }
});

cooking.add('plugin.UglifyJs', new webpack.optimize.UglifyJsPlugin({
  include: /\.min\.js$/,
  minimize: true,
  compress: {
    warnings: false
  }
}));

cooking.add('externals.vue', {
  root: 'Vue',
  commonjs: 'vue',
  commonjs2: 'vue',
  amd: 'vue'
});

module.exports = cooking.resolve();
