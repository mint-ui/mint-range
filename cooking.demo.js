var cooking = require('cooking');
var dist = './dist';

if (process.env.NODE_ENV === 'production') {
  dist = './example/dist';
}

cooking.set({
  use: 'vue',
  entry: './example/index.js',
  template: './example/index.tpl',
  dist: dist,
  publicPath: '/mint-range/',
  devServer: {
    port: 8809
  },
  extractCSS: true,
  clean: true,
  hash: true,
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

cooking.add('externals.vue', 'Vue');

module.exports = cooking.resolve();
