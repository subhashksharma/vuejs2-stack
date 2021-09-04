// process command line params for environment, version, browser logging
// usage: npm run serve -- --port 8080 --env dev|qa|psup|prod --ver 1.0.0

const webpack = require('webpack')
const argv = require('yargs').argv;
const path = require('path');

function getEndpoints() {
  let env = (argv.env === undefined || argv.env === true) ? 'dev' : argv.env;
  
  console.log('**** Endpoints: ', env);

  return JSON.stringify(env);
}

function getLogging() {
  let env = (argv.env === undefined || argv.env === true) ? 'dev' : argv.env;
  let logging = (env === 'prod') ? false : true;
 
  console.log('**** Browser logging: ',logging);

  return JSON.stringify(logging);
}

function getVersion() {
  let version = (argv.ver === undefined || argv.ver === true) ? new Date().toISOString() : argv.ver;

  console.log('**** Version: ' + version);

  return JSON.stringify(version);
}

module.exports = {
  transpileDependencies: ['vuex-persist'],
  runtimeCompiler: true,
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        'ENV': getEndpoints(),
        'VER': getVersion(),
        'LOG': getLogging()
      })
    ]
  },
  outputDir: path.resolve(__dirname, '../server/public'),
}
