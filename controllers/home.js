const BlogPost = require('../models/blogpost.js')

module.exports = async (req, res) =>{
const blogposts = await BlogPost.find({}).populate('userid');
console.log(req.session) // affichage de la session
res.render('index',{
blogposts
});
}