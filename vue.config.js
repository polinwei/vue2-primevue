console.log(`System is running as ${process.env.NODE_ENV} mode.`);

module.exports = {
  publicPath:  process.env.NODE_ENV === 'production' ? '/vue2-primevue/' : '/',

  configureWebpack: {
    devtool: 'source-map'
  },

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false
    }
  }
}
