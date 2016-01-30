'use strict';

const config = require('./config/config');
const WEBHOOK_URL = config.slack.webhook_url;
const slack = require('slack-notify')(WEBHOOK_URL);

module.exports = function(items) {

  let message = ':art: 新しいアイテムが追加されました！\n\n';

  items.map(function(item) {
    let itemMessage = `======================================================\n
                  *【${item.title}】*\n
                  【価格】- *${item.price}*\n
                  ${item.link}
                 `;
    message+=itemMessage;
  });

  slack.send({
    channel: config.slack.channel,
    icon_url: config.slack.icon_url,
    text: message,
    unfurl_links: config.slack.unfurl_links,
    username: config.slack.username
  });
}
