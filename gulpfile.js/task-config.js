const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  html        : true,
  images      : true,
  fonts       : true,
  static      : true,
  svgSprite   : true,
  ghPages     : true,
  stylesheets : true,

  javascripts: {
    entry: {
      // files paths are relative to
      // javascripts.dest in path-config.json
      app: ["./app.js"]
    },
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            js: 'babel-loader'
          }
        }
      }
    ],
    plugins: (webpack) => { return [new VueLoaderPlugin() ] },

    production: {
      uglifyJsPlugin: {
        extractComments: true,
        compress: {
          drop_console: true,
          warnings: false
        }
      },
    }
  },

  stylesheet: {
    autoprefixer: {
      browsers: ['> 2%', 'IE 10', 'iOS >= 7']
    }
  },

  browserSync: {
    server: {
      // should match `dest` in
      // path-config.json
      baseDir: 'public'
    }
  },

  production: {
    rev: true
  }
}
