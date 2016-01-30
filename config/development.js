module.exports = {
  port: 3000,
  db: {
    url: 'mongodb://localhost/mercarinotifier'
  },
  slack: {
    webhook_url: 'YOUR_WEBHOOK_URL_HERE',
    channel: '#mercari',
    icon_url: 'https://s3.mzstatic.com/us/r30/Purple69/v4/46/ef/ed/46efed7f-e0c8-497c-1a5f-90b7c98a4bf1/icon175x175.png',
    unfur_link: 1,
    username: 'mercari_notifier'
  },
  mercari: {
    url: 'https://www.mercari.com/jp/search/',
    word: 'fizz buzz',
    price_limit: 60000
  }
};
