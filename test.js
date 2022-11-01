const mongoose = require('mongoose')
const BlogPost = require('./models/blogpost')

mongoose.connect('mongodb://localhost:27017/blogpost3',
{useNewUrlParser: true, useUnifiedTopology: true}
);

BlogPost.find({
    title:/Panafricanisme/
}, (error, blogspot) =>{
    
    console.log(error,blogspot)
    })