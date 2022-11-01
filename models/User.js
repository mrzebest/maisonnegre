const mongoose = require('mongoose')
const Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator'); // pour eviter les crash en cas de doublon
const bcrypt = require('bcrypt')


const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, "Veuillez entrer un nom d'utilisateur"],
        unique: true
        },password: {
        type: String,
        required: [true,"Veuillez entrer un mot de passe"]
        }
        
});
UserSchema.plugin(uniqueValidator); // eviter les crash en cas de doublon avec mongoose-unique-validator

//Cela nous permet de modifier les données utilisateur avant de les enregistrer dans la base de données.
UserSchema.pre('save', function(next){
    
    const user = this
    //fonction de crypage de mdp
    bcrypt.hash(user.password, 10, (error, hash) => {
    user.password = hash
    next()
    })
    })


// export model
const User = mongoose.model('User',UserSchema);
module.exports = User
