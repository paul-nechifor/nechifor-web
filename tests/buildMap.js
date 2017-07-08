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

  const title = $('head title');
  if (!title.length || title.text().length < 5) {
    console.log(url, 'bad head title');
  }

  const equiv = $('head meta[http-equiv="x-ua-compatible"]');
  if (!equiv.length || equiv.attr('content') !== 'ie=edge') {
    console.log(url, 'bad http-equiv ie=edge');
  }

  const viewport = $('head meta[name=viewport]');
  if (
    !viewport.length ||
    viewport.attr('content') !== 'width=device-width,initial-scale=1'
  ) {
    console.log(url, 'bad meta viewport');
  }

  const largeIcon = $('head link[rel="apple-touch-icon"]');
  if (!largeIcon.length || largeIcon.attr('href') !== '/favicon152.png') {
    console.log(url, 'bad link[rel="apple-touch-icon"]');
  }

  if (!$('a[href="/"]').length) {
    console.log(url, 'missing link to home');
  }

  if (!$('a[href="/projects"]').length) {
    console.log(url, 'missing link to projects');
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
