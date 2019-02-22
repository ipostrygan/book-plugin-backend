const express = require('express');
const router = express.Router();
const request = require('request-promise');
const { parse } = require('node-html-parser');

const ORIGIN = 'http://flibusta.is';
const formats = ['mobi', 'fb2', 'epub'];

router.get('/', async function(req, res) {
  const page = await request(`${ORIGIN}/booksearch?ask=${encodeURIComponent(req.query.name)}&chb=on`);
  const root = parse(page);
  const bookList = root.querySelectorAll('#main ul li');

  const results = bookList.map(book => {
    const links = book.querySelectorAll('a');

    return {
      url: links[0].attributes.href,
      name: links[0].structuredText,
      author: links[1].structuredText,
      links: formats.map(format => ({
        format,
        url: ORIGIN + links[0].attributes.href + '/' + format
      }))
    };
  });

  res.send(results);
});

module.exports = router;
