const express = require('express'),
      app = express(),
      pug     = require('pug'),
      path    = require('path'),
      {buildParams} = require('../functions/buildparams'),
      {GetApples} = require('../controllers/image-controller'),
      {upload} = require('../services/upload-service')

app.set('views', path.join(__dirname, '../view/pages'));
app.set('view engine', 'pug');
app.use(express.static("assets"));

app.get('/about', async(req, res) => {
    let test = await GetApples();
    res.render('about', buildParams(req,{tests:test, fruit:'Apples'}));
    //res.render('employees',buildParams(req, {results:result, page:'employed'}))
});

/*
send json of urls to download to the front so that they can be used to view and download
errorhandle the upload and display it on the front end
req.files?
*/
app.post('/about',upload.single('pls'),async(req, res) => {
    res.redirect('/about');
});

/*
possibley change to a get so you can negate the form on the front end 
replace it with an href button on the front
*/
app.post('/about21',async(req, res) => {
    res.download('./uploads/ER Diagram.jpg');
});

module.exports = app;