module.exports = (req, res) =>{
    //converser les données d'utilisateur
        var username = ""
        var password = ""
        const data = req.flash('data')[0];
        if(typeof data != "undefined"){
        username = data.username
        password = data.password
        }
    // renvoie register.ejs
    res.render('register',  {
       // errors: req.session.validationErrors //lance un message erreur
        errors: req.flash('validationErrors'), // lance le message à partir de flash
        username: username,
        password: password



    } )
    }
    