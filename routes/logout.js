const express = require('express'),
      app = express(),
      pug     = require('pug'),
      path    = require('path'),
      session    = require("express-session"),
      {buildParams} = require("../functions/buildparams"),
      {getlog} = require("../controllers/login-controller"),
      flash = require('connect-flash');

app.set('views', path.join(__dirname, '../view/pages'));
app.set('view engine', 'pug');
app.use(express.static("assets"));
// app.use(require('connect-flash')());

app.get('/login', async(req, res) => {
    res.render('login',buildParams(req, {page:'login'}))
});

app.post('/logout', async(req, res) => {
    let test = await getlog(req.body.UserID, req.body.UserPass);
    console.log(test.code);
    if(test.code == 200){
        req.session.test = 21
        req.session.loggedin = true
        req.flash('success', test.message);
        res.redirect('/about');
    }
    else{
        console.log(test.message);
        res.redirect('/login');
    }
});

module.exports = app;