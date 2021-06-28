//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose")

mongoose.connect('mongodb://localhost:27017/blogDB', {useNewUrlParser: true, useUnifiedTopology: true});

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//Database
const postSchema = {
  title: String,
  content: String,
  date: String
}

const Post = mongoose.model("post", postSchema);

//Routing
app.get('/', function(req, res){
  Post.find({}, function(err, posts){
    if (err){
      console.log(err)
    } else{
        res.render('home', {posts: posts})
    }
  })
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
  let postTitle = req.body.postTitle
  let postContent= req.body.postContent
  let postDate = new Date().toLocaleDateString();
  const posts = new Post({
    title: postTitle,
    content: postContent,
    date: postDate
  })
  posts.save(function (err){
    if (err){
      console.log(err)
    } else {
      res.redirect('/');
    }
  })
})





app.listen(3000, function() {
  console.log("Server started on port 3000");
});
