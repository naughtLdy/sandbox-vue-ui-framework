const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');

const resolve = (file) => path.resolve(__dirname, file);

module.exports = {
  mode: 'production',
  entry: { app: ['./src/index.ts'] },
  devtool: 'source-map',
  node: {
    setImmediate: false,
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
  output: {
    library: 'sandbox-vue-ui-framework',
    libraryTarget: 'umd',
    libraryExport: 'default',
    filename: '[name].js',
    path: resolve('../dist'),
    publicPath: '/dist/',
    globalObject: `(typeof self !== 'undefined' ? self : this)`,
  },
  resolve: {
    alias: { '@': '/src', vue$: 'vue/dist/vue.runtime.esm.js' },
    extensions: ['.js', '.jsx', '.vue', '.json', '.ts', '.tsx'],
    modules: ['node_modules'],
  },
  resolveLoader: {
    modules: ['node_modules'],
  },
  module: {
    noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.css$/,
        use: ['css-loader'],
      },
      // {
      //   test: /\.css$/,
      //   use: [
      //     'style-loader',
      //     {
      //       loader: 'css-loader',
      //       options: {
      //         url: false,
      //         sourceMap: true,
      //       },
      //     }
      //   ]
      // },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
      },
    ],
  },
  plugins: [new VueLoaderPlugin()],
};
