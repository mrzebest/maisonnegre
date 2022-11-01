// le Middleware pour eviter la validation de champs vide , retour sur la meme page


    module.exports = (req,res,next)=>{
        if(req.files == null || req.body.title == '' ||req.body.summary == '' ||
        req.body.body == ''){
        return res.redirect('/post/new')
        }
        next()
        }


       /* const validateMiddleWare = (req,res,next)=>{
            if(req.files == null || req.body.title == '' ||
            req.body.body == ''){
            return res.redirect('/post/new')
            }
            next()
            } */