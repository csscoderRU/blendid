//Rsync
const Rsync = require('rsync');
const pkg = require('../package.json');
const access = require('./_accessDeploy.json');

const directory = pkg.name;
const localPath = 'public/';
const hostname = access.hostname;
const username = access.username;
const port = access.port;
const hostDestination = `${access.hostDestination}${directory}`;
const rsync = new Rsync()
  .set('progress')
  .shell(`ssh -p ${port}`)
  .exclude(['.DS_Store'])
  .set('delete')
  .flags('az')
  .source(localPath)
  .destination(`${username}@${hostname}:${hostDestination}/`);

rsync.execute(function (error, code) {
  if (error) {
    console.log(error);
  }
  if (code === 0) {
    console.log(`Deployed 'public/' to ${username}@${hostname}:${hostDestination}/`);
    console.log(`http://dev.csscoder.pro/${directory}/csscoder.html`);
  }
});
