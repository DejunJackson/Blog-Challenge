//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get('/', function(req, res){
  res.render('home')
})

app.get('/about', function (req, res){
  res.render('about')
})

app.get('/contact', function (req, res){
  res.render('contact')
})

app.get('/compose', function (req, res){
  res.render('compose');
})

app.post('/', function (req, res){
  var title = req.body.postTitle
  var body = req.body.postContent
  console.log(title + ', ' + body)
})





app.listen(3000, function() {
  console.log("Server started on port 3000");
});
