'use strict';

const app = require('express')();

const mongoose = require('mongoose');
const CronJob = require('cron').CronJob;

const config = require('./config/config');
const cronJob = require('./cronjob');

app.listen(config.port);

// connect mongodb
mongoose.connect(config.db.url);

const job = new CronJob({
  // run cron every minute
  cronTime: '* * * * *',
  onTick: cronJob,
  start: true,
  timeZone: 'Asia/Tokyo'
});

// start cron
job.start();
