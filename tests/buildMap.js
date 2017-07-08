const _ = require('lodash');
const async = require('async');
const cheerio = require('cheerio');
const request = require('request');

const root = process.env.site || 'http://localhost';

const outerLinks = [];
const innerLinks = ['/'];

const innerLinksPrefix = [
  '/',
  root,
];

const seenLink = {'/': true};

function loadPage(url, cb) {
  request(url, (err, res, html) => {
    if (err) {
      return cb(err);
    }
    cb(null, cheerio.load(html));
  });
}

function loadAllLinks(cb) {
  let i = 0;

  const load = () => {
    processInnerLink(i, (err) => {
      if (err) {
        return cb(err);
      }

      if (++i < innerLinks.length) {
        load();
      } else {
        cb();
      }
    });
  };

  load();
}

function processInnerLink(i, cb) {
  const url = getInnerLink(i);
  if (seenLink[url]) {
    return cb();
  }

  loadPage(url, (err, $) => {
    if (err) {
      return cb(err);
    }

    processPage(url, $);

    $('a[href]').each(function () {
      const href = $(this).attr('href');
      if (seenLink[href]) {
        return;
      }
      seenLink[href] = true;
      if (_.some(innerLinksPrefix.map(x => href.indexOf(x) === 0))) {
        if (href.indexOf('http://')) {
          const url = href.substring(href.indexOf('/', 'http://'.length));
          innerLinks.push(url || '/');
        } else {
          innerLinks.push(href);
        }
      } else {
        outerLinks.push(href);
      }
    });

    cb();
  });
}

function processPage(url, $) {
  if (!$('head meta[charset="utf-8"]').length) {
    console.log(url, 'missing <meta charset="utf-8">');
  }
}

function getInnerLink(i) {
  return root + innerLinks[i];
}

function main(cb) {
  loadAllLinks(cb);
}

main((err) => {
  if (err) {
    throw err;
  }
});
