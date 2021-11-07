const express = require('express'),
      app     = express(),
      pug     = require('pug'),
      path    = require('path'),
      draw    = pug.renderFile,
      bodyParser = require('body-parser'),
      routes = require('./app/routes'),
      session    = require("express-session"),
      nedbstore  = require("nedb-session-store")(session),
      nedb      = require("nedb"),
      flash = require('connect-flash')

const port = process.env.PORT || 591;
app.set('views', path.join(__dirname, 'view/pages'));
app.set('view engine', 'pug');
app.locals.basedir = __dirname;
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});
app.use(require('connect-flash')());
app.use(express.static('/assets'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json())
app.use(
  // Make the secret and ENV
  session({
    name: "TheCookie",
    secret: "InTheBleakMidwinter",
    resave: true,
    saveUnitialized: true,
    cookie:{path:"/", httpOnly: true, maxAge: 1000*60*60*6},
    store: new nedbstore({filename: "db/sessions.db"})
  })
)
// Main Routes
app.use('', routes);

// Routes for login
app.use('', require("./routes/login-route"));

// Routes for about
app.use('', require("./routes/image-route"));

app.get('/', async(req, res) => {
  res.render('index')
});

app.post('/', async(req, res) => {
  res.redirect('/login');
});

app.get('/signout', function(req, res) {
  req.session.destroy(function(err) {
    if(err) {
        console.log(err);
    } else {
        res.redirect('/');
    }
  })
})

app.listen(port, function() {
    console.log("App running on port: " + port);
  })