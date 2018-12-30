const os          = require('os')
const path        = require('path')
const projectPath = require('./projectPath')
const pkg         = require(projectPath('package.json'))

const moment = require('moment-timezone');
const timeUpdate = moment().tz(pkg.clientTimeZone).format('DD MMM YYYY, HH:mm');

let manageEnvironment = function(environment) {
  environment.addGlobal('globalTimeBuild', timeUpdate);
  environment.addGlobal('globalTimeZone', pkg.clientTimeZone);
  environment.addGlobal('globalTitle', pkg.title);
  environment.addGlobal('globalStartDate', pkg.startDate);
};

module.exports = {
  javascripts: {
    extensions: ['js', 'jsx'],
    hot: {
      reload: true,
      noInfo: false,
      quiet: true,
      react: false
    },
    devtool: 'eval-cheap-module-source-map',
    babelLoader: {
      // "test" is derived from TASK_CONFIG.javascripts.extensions
      // "options" is derived from TASK_CONFIG.javascripts.babel
      loader: 'babel-loader',
      exclude: /node_modules/
    },
    babel: {
      presets: [["es2015", { "modules": false }], 'stage-1']
    },
    development: {},
    production: {
      devtool: false,
      uglifyJsPlugin: {},
      definePlugin: {
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }
    }
  },

  stylesheets: {
    sass: {
      includePaths: [
        "./node_modules"
      ]
    },
    extensions: ["sass", "scss", "css"],
    mqpacker: true,
    minify: true,
    autoprefixer: {
      browsers: ['> 2%', 'IE 10', 'iOS >= 7']
    }
  },

  html: {
    dataFile: "data/global.json",
    nunjucksRender: {
      manageEnv: manageEnvironment,
      envOptions: {
        watch: false
      }
    },
    htmlmin: {
      collapseWhitespace: true
    },
    beautify: false,
    excludeFolders: ["layouts", "shared", "macros", "data"],
    extensions: ["html", "njk", "json"]
  },

  images: {
    extensions: ["jpg", "png", "svg", "gif"]
  },

  fonts: {
    extensions: ["woff2", "woff", "eot", "ttf", "svg"]
  },

  ghPages: {
    branch: "gh-pages",
    cacheDir: path.join(os.tmpdir(), pkg.name || "blendid")
  },

  svgSprite: {
    svgstore: {}
  },

  production: {
    rev: true
  },

  additionalTasks: {
    initialize(gulp, PATH_CONFIG, TASK_CONFIG) {
      // gulp.task('myTask', function() { })
    },
    development: {
      prebuild: null,
      postbuild: null
    },
    production: {
      prebuild: null,
      postbuild: null
    }
  }
}

