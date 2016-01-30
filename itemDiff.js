'use strict';

const mongoose = require('mongoose');
const _ = require('lodash');
const Item = require('./itemModel');
const slack = require('./slack');

module.exports = function(currentItems) {
  Item.find({})
    .then(function(items) {
      // if there is no data in DB, then store crawled current items
      if(items.length === 0 ) {
        Item.create(currentItems, function(err, saved) {
          if(err) console.error(err);
        });
      } else {
        // delete some properties that current items do not have, which is a unique prop of mongodb
        let dbItems = _.map(items, function(item) {
          item = item.toJSON();
          return _.omit(item, ['_id', '__v']);
        });

        // compare previous items stored in DB to crawled current items
        let isEqual = _.isEqual(dbItems, currentItems);

        if(!isEqual) {
          console.log('Check out new item!!!!');

          // first delete all items stored in DB
          Item.remove({}, function(err, removed) {
            if(err) {
              console.error(err);
            } else {
              // then store new items
              Item.create(currentItems, function(err, saved) {
                if(err) { console.error(err) }
                else {
                  // There is a new item found, send a notification to Slack!
                  let itemsDiff = _.difference(dbItems, currentItems);
                  slack(itemsDiff);
                };
              });
            }
          });
        } else {
          console.log('No new item found :(');
        }
      }
    }, function(err) {
      console.log(err);
    });
}
