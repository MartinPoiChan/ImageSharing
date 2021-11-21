const express = require('express'),
      app = express(),
      pug     = require('pug'),
      path    = require('path'),
      {buildParams} = require('../functions/buildparams'),
      {lll, insertImage, deleteImage} = require('../controllers/image-controller'),
      {insertUserc} = require('../controllers/register-controller'),
      {upload} = require('../services/upload-service'),
      mime = require('mime-types'),
      fs = require('fs')

app.set('views', path.join(__dirname, '../view/pages'));
app.set('view engine', 'pug');
app.use(express.static("assets"));

app.get('/register', async(req, res) => {
    res.render('register');
});

app.post('/register', async(req, res) => {
    let result = await insertUserc(req.body.fname, req.body.lname, req.body.email, req.body.pass)
    console.log(result.code);
    console.log(result);
    req.flash('error', 'Invalid file type.');
    res.redirect('/register');
});

module.exports = app;