// vue.config.js

/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
      ? '/rozetka-yml/'
      : '/',
      outputDir: 'docs'
}