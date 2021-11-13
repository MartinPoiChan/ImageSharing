const express = require('express'),
      app = express(),
      pug     = require('pug'),
      path    = require('path'),
      session    = require("express-session"),
      {buildParams} = require("../functions/buildparams"),
      {getNonController,insertPermissionController,removePermissionController} = require("../controllers/permission-controller"),
      flash = require('connect-flash');

app.set('views', path.join(__dirname, '../view/pages'));
app.set('view engine', 'pug');
app.use(express.static("assets"));

app.get('/permission/:down', async(req, res) => {
    if(result == undefined){
        req.flash('error', 'You do not have permission');
        res.redirect('/')
    }
    let result = await getNonController(req.params.down)
    res.render('permission',buildParams(req, {results:result, down:req.params.down}))
});

app.post('/permission/add/:down/:user', async(req, res) => {
    if(result == undefined){
        req.flash('error', 'You do not have permission');
        res.redirect('/')
    }
    await insertPermissionController(req.params.down, req.params.user)
    let result = await getNonController(req.params.down)
    res.render('permission',buildParams(req, {results:result, down:req.params.down}))
});

app.post('/permission/remove/:down/:user', async(req, res) => {
    if(result == undefined){
        req.flash('error', 'You do not have permission');
        res.redirect('/')
    }
    console.log('DOWN: '+req.params.down);
    await removePermissionController(req.params.down, req.params.user)
    console.log('USER: '+req.params.user);
    let result = await getNonController(req.params.down)
    res.render('permission',buildParams(req, {results:result, down:req.params.down}))
});

module.exports = app;