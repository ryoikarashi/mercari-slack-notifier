'use strict';

const _ = require('lodash');

const config = {
  dev: 'development',
  prod: 'production'
};

process.env.NODE_ENV = process.env.NODE_ENV || config.dev;

config.env = process.env.NODE_ENV;

let envConfig;

try {
  envConfig = require(`./${config.env}`);
  envConfig = envConfig || {};
} catch(e) {
  envConfig = {};
}

console.log('envConfig.mercari.word', envConfig.mercari.word);

module.exports = _.merge(config, envConfig);
