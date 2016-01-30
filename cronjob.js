'use strict';
const client = require('cheerio-httpcli');

const config = require('./config/config');
const itemDiff = require('./itemDiff');

const url = config.mercari.url;
const KEY_WORD = config.mercari.word;
const PRICE_LIMIT = config.mercari.price_limit;

module.exports = function() {
  const param = { keyword: KEY_WORD };
  client.fetch(url, param, function(err, $, res) {
    if(err) { console.log(err); return; }

    let items = [];
    let isNotFound = $('h2.search-no-result-head').length == 0;

    if(isNotFound) {
      // iterate items
      $('.items-box > div').each(function(i) {
        let isItemAvailable = $(this).find('.item-sold-out-badge').length === 0;
        // check if the item is for sale
        if(isItemAvailable) {
          let itemPrice = parseInt($(this).find('.items-box-price').text().replace('¥', '').replace(' ', '').replace(',', ''));
          // check if the available item is less than the price you set
          if(PRICE_LIMIT >= itemPrice) {
            let item = {
              title: $(this).find('.items-box-name').text(),
              img: $(this).find('.items-box-photo').attr('src'),
              price: itemPrice,
              link: $(this).find('.items-box-inner-box').children('a').attr('href')
            };
            // add the item to items array
            items.push(item);
          }
        }
      });
      // when new products are availabe, send notification to a specific Slack channel
      itemDiff(items);
    } else {
      console.log('No items found!! :(');
    }
  });
}
