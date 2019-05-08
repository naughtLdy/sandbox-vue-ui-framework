module.exports = {
  // output: {
  //   path: '/dist/',
  //   publicPath: '/dist/',
  //   library: 'sandbox-vue-ui-framework',
  //   libraryTarget: 'umd',
  //   libraryExport: 'default',
  // },
  chainWebpack: config => {
    config.output.filename('[name].js')
  },
  css: {
    extract: false
  },
};
