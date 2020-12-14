'use strict';

const express = require('express');
const router = express.Router();
const nameGenerator = require('../lib/nameGenerator');

module.exports = (ws) => {
  /* GET home page. */
  router.get('/', function (req, res, next) {
    res.render('index', { title: 'Party Chat!!' });
  });

  router.post('/', function (req, res) {
    //ws.send(req.body.text.trim())
    const name = req.cookies.user ? req.cookies.user : nameGenerator();

    ws.sendRender('messageSnippet.pug', {
      "name": name,
      "message": req.body.text.trim()
    })

    res.cookie('user', name);
    res.redirect('/')
  });

  return router;
};
