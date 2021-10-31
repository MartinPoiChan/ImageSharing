const express = require('express'),
      app     = express(),
      pug     = require('pug'),
      path    = require('path')
      draw    = pug.renderFile,
      bodyParser = require('body-parser'),
      routes = require('./app/routes')


const port = process.env.PORT || 591;
app.set('views', path.join(__dirname, 'view/pages'));
app.set('view engine', 'pug');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json())

function buildParams(req, additionalData) {
  var res = {...additionalData};
     if(req.session.loggedIn) {
       res.role = req.session.role;
      }
  return res;
}

// Main Routes
app.use('', routes);

// Routes for about
app.use('', require("./routes/about-route"));

app.get('/', (req, res) => {
     res.render('index');
})

app.listen(port, function() {
    console.log("App running on port: " + port);
  })