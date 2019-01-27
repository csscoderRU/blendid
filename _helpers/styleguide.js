const kss = require('kss');
const path = require('path');
const manifest = require(path.join(__dirname, '../public/rev-manifest.json'));

let options = {
  source: [path.join(__dirname, '../src/stylesheets/'), path.join(__dirname, '../src/blocks/')],
  destination: path.join(__dirname, '../public/styleguide/'),
  homepage: '../styleguide/styleguide.md',
  title:  `StyleGuide`,
  css: path.join('../', manifest["stylesheets/app.css"]),
  builder: path.join(__dirname, '../src/styleguide/template/')
};

return kss(options);
