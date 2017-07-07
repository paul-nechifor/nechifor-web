const _ = require('lodash');
const async = require('async');
const cheerio = require('cheerio');
const request = require('request');

const root = process.env.site || 'http://localhost';

function loadPage(url, cb) {
  request(url, (err, res, html) => {
    console.log('url', url)
    if (err) {
      return cb(err);
    }
    cb(null, cheerio.load(html));
  });
}

function main(cb) {
  loadPage(root, (err, $) => {
    if (err) {
      return cb(err);
    }
    console.log($('head').html());
  });
}

main((err) => {
  if (err) {
    throw err;
  }
});
