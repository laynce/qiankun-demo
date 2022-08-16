const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    output: {
      library: `subVue-[name]`,
      libraryTarget: 'umd',
      filename: 'subVue.[name].js'
    },
  },
  devServer: {
    port: 5000,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  }
})