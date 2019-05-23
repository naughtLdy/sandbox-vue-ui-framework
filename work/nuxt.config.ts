import NuxtConfiguration from '@nuxt/config';
import { Configuration } from 'webpack';
import SandboxVueUiFrameworkPlugin from 'sandbox-vue-ui-framework-loader/lib/plugin';
import { name, description } from './package.json';
const ExtractCssChunksPlugin = require('extract-css-chunks-webpack-plugin');

const nuxtConfig: NuxtConfiguration = {
  dev: process.env.NODE_ENV !== 'production',
  srcDir: 'src/',
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: description },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  // css: [],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/SandboxVueUiFramework'],

  /*
   ** Nuxt.js modules
   */
  // modules: [],

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    transpile: ['sandbox-vue-ui-framework/src'],
    plugins: [new SandboxVueUiFrameworkPlugin({})],
    extend(config: Configuration, ctx: any) {
      const cssChunksPlugin: any = config.plugins.find(
        (plugin: any) => plugin instanceof ExtractCssChunksPlugin,
      );
      if (cssChunksPlugin) {
        // Remove warnings about conflicting order between imports
        // https://github.com/faceyspacey/extract-css-chunks-webpack-plugin/blob/v4.3.0/src/index.js#L485
        cssChunksPlugin.options.orderWarning = false;
      }
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        if (!config.module) return;
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        });
      }
      config.devtool = '#source-map';
    },
  },
};

export default nuxtConfig;
