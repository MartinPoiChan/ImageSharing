const session = require('express-session');

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
      {getUser} = require('../repository/user-repo'),
      {getOneImage} = require('../repository/image-repo'),
      { decrypt } = require('../services/crypto-service'),
      nodemailer = require('nodemailer');

app.set('views', path.join(__dirname, '../view/pages'));
app.set('view engine', 'pug');
app.use(express.static("assets"));

const transporter = nodemailer.createTransport({
    port: 465,               // true for 465, false for other ports
    host: "smtp.gmail.com",
       auth: {
            user: 'cmpg323tester@gmail.com',
            pass: 'MPC33272417',
         },
    secure: true,
    });


app.get('/upload', async(req, res) => {
    if(!req.session.loggedin)
    {
        req.flash('error', 'Please Log in');
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
        req.flash('error', 'Please Log in');
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
        req.flash('error', 'Please Log in');
        res.redirect('/')
    }
    else{
        let result = await getImage(req.params.down)
        res.render('edit', buildParams(req,{results:result, fruit:'Apples'}));
    }
});

app.get('/shared/:down', async(req, res) => {
    if(!req.session.loggedin)
    {
        req.flash('error', 'Please Log in');
        res.redirect('/')
    }
    else{
        let result = await getAccess(req.params.down, req.session.uid)
        result.forEach(element => {
            element.fname = decrypt(element.fname)
            element.lname = decrypt(element.lname)       
        });
        if(result == undefined){
            req.flash('error', 'You do not have permission');
            res.redirect('/')
        }
        else{
            console.log(result);
            let img = await getOneImage(req.params.down)
            res.render('display', buildParams(req,{results:img, down:req.params.down}));
        }
    }
});
                            //(geo, date, down, tags, capture)
app.post('/edit/:down', async(req, res) => {
    if(!req.session.loggedin)
    {
        req.flash('error', 'Please Log in');
        res.redirect('/')
    }
    else{
        let result = await editImage(req.body.location, req.body.capture_date, req.params.down ,req.body.tags, req.body.captured_by)
        res.redirect('/display/all');
    }
});

app.get('/share/:down', async(req, res) => {
    if(!req.session.loggedin)
    {
        req.flash('error', 'Please Log in');
        res.redirect('/')
    }
    let result = await getAccess(req.params.down, req.session.uid)
    result.forEach(element => {
        element.fname = decrypt(element.fname)
        element.lname = decrypt(element.lname)       
    });
    if(result == undefined){
        req.flash('error', 'You do not have permission');
        res.redirect('/')
    }
    else{
        console.log(result);
        req.flash('success', 'http://localhost:591/test/'+req.params.down);
        res.render('share', buildParams(req,{results:result, down:req.params.down}));
    }
});

app.post('/share/:down/:user',async(req, res) => {
    let userInfo = await getUser(req.params.user)
    userInfo[0].email = decrypt(userInfo[0].email)
    console.log(userInfo[0].email);
    const mailData = {
        from: 'cmpg323tester@gmail.com',  // sender address
          to: userInfo[0].email,   // list of receivers
          subject: 'Sending Email using Node.js',
          text: 'This image was shared with you by '+req.session.fname,
          html: '<b>This image was shared with you by '+req.session.fname+'</b><br> http://localhost:591/shared/'+req.params.down,
        };
        transporter.sendMail(mailData, function (err, info) {
            if(err)
                req.flash('error', 'Could not send email');
            else
                req.flash('success', 'Image link shared via email');
         });
    res.redirect('/display/all');
});

app.post('/upload',upload.single('pls'),async(req, res) => {
    console.log(req.file);
    console.log(req.body.tags);
    console.log('captured: '+req.body.captured);
    if(mime.extension(req.file.mimetype) == 'bmp'||
        mime.extension(req.file.mimetype) =='ico'||
        mime.extension(req.file.mimetype) == 'jpeg'||
        mime.extension(req.file.mimetype) == 'jpg'||
        mime.extension(req.file.mimetype) == 'gif'||
        mime.extension(req.file.mimetype) == 'tiff'||
        mime.extension(req.file.mimetype) == 'png'
    ){
        await insertImage(req.file.path, req.body.geo, req.body.date, req.session.uid, req.file.originalname, req.file.size, mime.extension(req.file.mimetype),req.file.filename, req.body.tags, req.body.captured)
        req.flash('success', 'File uploaded');
        res.redirect('/upload');
    }
    else{
        req.flash('error', 'Invalid file type.');
        res.redirect('/upload');
    }
});

// app.post('/sharedlink/:down_name'),async(req, res) => {
//     let down_name = req.params.down_name
//     req.flash('success', 'http://localhost:591/sharedlink/'+down_name);
//     res.redirect('/')l
// }

// app.get('/sharedlink'),async(req, res) => {
//     let result = await getAccess(req.session.uid, req.params.down_name)
//     console.log(result);
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

app.get('/about21/:stuff',async(req, res) => {
    console.log('.'+req.params.stuff);
    res.download('assets/uploads/'+req.params.stuff);
});

app.get('/delete/:stuff',async(req, res) => {
    try{
        deleteImage(req.params.stuff)
        fs.unlinkSync('assets/uploads/'+req.params.stuff)
        req.flash('success', 'File removed');
        res.redirect('/display/all');
    }
    catch(err){
        console.log(err);
        req.flash('error', 'Something broke: '+err);
        res.redirect('/upload');
    }
});
module.exports = app;