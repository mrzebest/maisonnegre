// permet la validation du formulaire d'ajout d'article

const BlogPost = require('../models/blogpost.js')
const path = require('path')

module.exports = (req,res)=>{
let image = req.files.image;
image.mv(path.resolve(__dirname,'..','public/img',image.name),
async (error)=>{
await BlogPost.create({
...req.body,
image: '/img/' + image.name,
userid: req.session.userId
})
res.redirect('/')
})
}


/*app.post('/posts/store', (req,res)=>{
    let image = req.files.image;
    image.mv(path.resolve(__dirname,'public/img',image.name),
    async (error)=>{
    await BlogPost.create({
        ...req.body,
        image: '/img/'+image.name
    })
    res.redirect('/')
    })
    }) */ 