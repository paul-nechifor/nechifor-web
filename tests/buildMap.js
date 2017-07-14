const URL = require('url');
const _ = require('lodash');
const async = require('async');
const cheerio = require('cheerio');
const request = require('request');

const root = process.env.site || 'http://localhost';

const outerLinks = [];
const innerLinks = [root + '/'];
const seenLink = {};

function loadPage(url, cb) {
  request(url, (err, res, html) => {
    if (err) {
      return cb(err);
    }
    html = removeNonIndexablePart(html);
    cb(null, cheerio.load(html), html);
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
  const url = innerLinks[i];
  if (seenLink[url]) {
    return cb();
  }
  seenLink[url] = true;

  loadPage(url, (err, $, html) => {
    if (err) {
      return cb(err);
    }

    processPage(url, $, html);

    $('a[href]').each(function () {
      let href = $(this).attr('href');

      href = href.replace(/^https:\/\//, 'http://');
      href = href.replace(/^http:\/\/nechifor\.net/, root);
      href = href.replace(/#.*/, '');

      if (href.indexOf('http://') !== 0) {
        if (href[0] === '/') {
          href = root + href;
        } else {
          href = URL.resolve(url, href);
        }
      }

      if (href === root) {
        href += '/';
      }

      if (seenLink[href]) {
        return;
      }

      if (href.indexOf('http://localhost') === 0) {
        innerLinks.push(href);
      } else {
        outerLinks.push(href);
      }
    });

    cb();
  });
}

function processPage(url, $, html) {
  if (!$('head meta[charset="utf-8"]').length) {
    console.log(url, 'missing <meta charset="utf-8">');
  }

  if (html.indexOf('<!DOCTYPE html>') !== 0) {
    console.log(url, 'bad <!DOCTYPE html>');
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

  const lang = $('html').attr('lang');
  if (lang !== 'en' && lang !== 'ro') {
    console.log(url, 'missing <html lang="...">');
  }

  const desc = $('meta[description]');
  if (!desc.length || desc.text().length < 5) {
    console.log(url, 'bad <meta name="description" ...>');
  }

  if (!$('h1').length) {
    console.log(url, 'missing <h1>');
  }
}

function endsWith(str, suffix) {
	return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

function removeNonIndexablePart(html) {
  const start = 'googleoff: all';
  const end = 'googleon: all';

	for (;;) {
    let startIndex = html.indexOf(start);
    if (startIndex === -1) {
      break;
    }

    let endIndex = html.indexOf(end);
    if (endIndex === -1) {
      throw new Error('Failed to find end.');
    }

    html = html.substring(0, startIndex) + html.substring(endIndex + end.length);
	}

	return html;
}

function main(cb) {
  loadAllLinks(cb);
}

main((err) => {
  if (err) {
    throw err;
  }
});
