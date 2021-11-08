const express = require('express'),
      app = express(),
      pug     = require('pug'),
      path    = require('path'),
      {buildParams} = require('../functions/buildparams'),
      {lll, insertImage, deleteImage} = require('../controllers/image-controller'),
      {upload} = require('../services/upload-service'),
      mime = require('mime-types'),
      fs = require('fs')

app.set('views', path.join(__dirname, '../view/pages'));
app.set('view engine', 'pug');
app.use(express.static("assets"));

app.get('/upload', async(req, res) => {
    let result = await lll(req.session.uid);
    let pls = result.result
    res.render('upload', buildParams(req,{results:pls, fruit:'Apples'}));
    //res.render('employees',buildParams(req, {results:result, page:'employed'}))
});

app.get('/display/:type', async(req, res) => {
    let type = req.params.type
    console.log(type);
    let result
    result =  await lll(req.session.uid,type);
    console.log(result);
    res.render('display', buildParams(req,{results:result.result, fruit:'Apples'}));
});

/*
send json of urls to download to the front so that they can be used to view and download
errorhandle the upload and display it on the front end2
req.files?
*/
app.post('/upload',upload.single('pls'),async(req, res) => {
    console.log(req.file);
    console.log(req.body.tags);
    insertImage(req.file.path, req.body.geo, req.body.date, req.session.uid, req.file.originalname, req.file.size, mime.extension(req.file.mimetype),req.file.filename, req.body.tags)

    res.redirect('/upload');
});

/*
possibley change to a get so you can negate the form on the front end 
replace it with an href button on the front
*/
app.post('/upload/:path',async(req, res) => {
    console.log(req.params.path);
    res.download('assets/uploads/'+req.params.stuff);
});

app.post('/about21/:stuff',async(req, res) => {
    console.log('.'+req.params.stuff);
    res.download('assets/uploads/'+req.params.stuff);
});

app.post('/delete/:stuff',async(req, res) => {
    try{
        deleteImage(req.params.stuff)
        fs.unlinkSync('assets/uploads/'+req.params.stuff)
        req.flash('success', 'File removed');
        res.redirect('/display/all');
        // try not redirect and just post
    }
    catch(err){
        console.log(err);
        req.flash('error', 'SOmething broke: '+err);
        res.redirect('/upload');
    }
});
module.exports = app;