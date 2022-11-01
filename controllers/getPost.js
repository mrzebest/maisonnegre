// permet l'affichage des posts par page unique

const BlogPost = require('../models/blogpost.js')
module.exports = async (req,res)=>{
const blogpost = await BlogPost.findById(req.params.id).populate('userid');
console.log(blogpost)
res.render('post',{
blogpost
});
}
