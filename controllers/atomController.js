var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://test:test@ds133331.mlab.com:33331/atomize');

var atomSchema = new mongoose.Schema({
  item: String
});

var Atom = mongoose.model('Atom', atomSchema);

//var data = [{item: 'resume'}, {item: 'shopify'}, {item: 'website'}];
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){

app.get('/todo', function(req, res){
  Atom.find({}, function(err, data){
    if (err) throw err;
  res.render('atom', {todos: data});
  });
});

app.post('/todo', urlencodedParser, function(req, res){
  var newItem = Atom(req.body).save(function(err, data){
    if (err) throw err;
  res.json(data);
  })
});

app.delete('/todo/:item', function(req, res){
  Atom.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
    if (err) throw err;
    res.json(data);
  });
});

};
