module.exports = {
  port: process.env.PORT,
  db: {
    url: process.env.MONGOLAB_URI
  },
  slack: {
    webhook_url: process.env.SLACK_WEBHOOK_URL,
    channel: `#${process.env.SLACK_CHANNEL}`,
    icon_url: 'https://s3.mzstatic.com/us/r30/Purple69/v4/46/ef/ed/46efed7f-e0c8-497c-1a5f-90b7c98a4bf1/icon175x175.png',
    unfur_link: 1,
    username: 'mercari_notifier'
  },
  mercari: {
    url: process.env.MERCARI_URL,
    word: process.env.MERCARI_WORD,
    price_limit: process.env.MERCARI_PRICE_LIMIT
  }
};
