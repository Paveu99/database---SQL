const express = require('express');

const starterRouter = express.Router();

starterRouter

  .get('/', (req, res) => {
    res.redirect('client');
    // res.render('client/form/entry');
  });

module.exports = {
  starterRouter,
};
