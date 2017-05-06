var express = require('express');
var atomController = require('./controllers/atomController');
var app = express();

//use ejs view engine
app.set('view engine', 'ejs');

//enable access to assets
app.use(express.static('./public'));

//use controllers
atomController(app);

//listen to port
app.listen(3000);
