const express = require('express'),
      app = express(),
      pug     = require('pug'),
      path    = require('path'),
      {buildParams} = require('../functions/buildparams'),
      {lll, insertImage, deleteImage, getImage, editImage} = require('../controllers/image-controller'),
      {upload} = require('../services/upload-service'),
      mime = require('mime-types'),
      fs = require('fs'),
      {getAccess} = require('../repository/permission-repo'),
      {getOneImage} = require('../repository/image-repo')


app.set('views', path.join(__dirname, '../view/pages'));
app.set('view engine', 'pug');
app.use(express.static("assets"));

app.get('/upload', async(req, res) => {
    if(!req.session.loggedin)
    {
        req.flash('Error', 'Please Log in');
        res.redirect('/')
    }
    else{

        let result = await lll(req.session.uid);
        let pls = result.result
        res.render('upload', buildParams(req,{results:pls, fruit:'Apples'}));
    }
    //res.render('employees',buildParams(req, {results:result, page:'employed'}))
});

app.get('/display/:type', async(req, res) => {
    if(!req.session.loggedin)
    {
        req.flash('Error', 'Please Log in');
        res.redirect('/')
    }
    else{
        let type = req.params.type
        let result
        result =  await lll(req.session.uid,type);
        res.render('display', buildParams(req,{results:result.result, fruit:'Apples'}));
    }
});

app.get('/edit/:down', async(req, res) => {
    if(!req.session.loggedin)
    {
        req.flash('Error', 'Please Log in');
        res.redirect('/')
    }
    else{
        let result = await getImage(req.params.down)
        console.log('RESULT: '+result.img[0].capture_date);
        res.render('edit', buildParams(req,{results:result, fruit:'Apples'}));
    }
});
                            //(geo, date, down, tags, capture)
app.post('/edit/:down', async(req, res) => {
    if(!req.session.loggedin)
    {
        req.flash('Error', 'Please Log in');
        res.redirect('/')
    }
    else{
        let result = await editImage(req.body.location, req.body.capture_date, req.params.down ,req.body.tags, req.body.captured_by)
        res.redirect('/display/all');
    }
});

app.get('/test/:down', async(req, res) => {
    if(!req.session.loggedin)
    {
        req.flash('Error', 'Please Log in');
        res.redirect('/')
    }
    console.log(req.session.uid);
    console.log(req.params.down);
    let result = undefined
    //let result = await getAccess(req.params.down, req.session.uid)
    if(result == undefined){
        req.flash('error', 'You do not have permission');
        res.redirect('/')
    }
    else{
        req.flash('success', 'http://localhost:591/test/'+req.params.down);
        console.log(result);
        let pls = await getOneImage(req.params.down)
        console.log(pls);
        res.render('display', buildParams(req,{results:pls, fruit:'Apples'}));
    }
});

/*
send json of urls to download to the front so that they can be used to view and download
errorhandle the upload and display it on the front end2
req.files?
*/
app.post('/upload',upload.single('pls'),async(req, res) => {
    console.log(req.file);
    console.log(req.body.tags);
    console.log('captured: '+req.body.captured);
    await insertImage(req.file.path, req.body.geo, req.body.date, req.session.uid, req.file.originalname, req.file.size, mime.extension(req.file.mimetype),req.file.filename, req.body.tags, req.body.captured)
    res.redirect('/upload');
});


// app.post('/sharedlink/:down_name'),async(req, res) => {
//     let down_name = req.params.down_name
//     req.flash('success', 'http://localhost:591/sharedlink/'+down_name);
//     res.redirect('/')
// }

// app.get('/sharedlink'),async(req, res) => {
//     //let result = await getAccess(req.session.uid, req.params.down_name)
//     //console.log(result);
//     res.render('display');
// }

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
        req.flash('error', 'Something broke: '+err);
        res.redirect('/upload');
    }
});
module.exports = app;