// création de nouvel utilisiateur

const User = require('../models/User.js')
const path = require('path')

module.exports = (req,res)=>{
User.create(req.body, (error, user) => {
//notifier les erreurs d'ajout
if(error){
    const validationErrors = Object.keys(error.errors).map(key =>
        error.errors[key].message)
        req.flash('validationErrors',validationErrors) //appel fonction flash
        req.flash('data',req.body) // conserver les données d'utilisateur
        return res.redirect('/auth/register')
    }
res.redirect('/')
})
}
