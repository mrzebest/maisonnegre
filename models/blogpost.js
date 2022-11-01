//déclaration des variables
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//création d'un Schema pour la collection de post du blog 
// ex: titre + Corps 
const BlogPostSchema = new Schema ({
    title: String,
    body: String,
    //username: String,
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
        },

    datePosted:{
        type: Date,
        default: new Date()
    },
    image: String,
    summary:{
        type: String,
    }
});

// accéder à la base de données
const BlogPost = mongoose.model('BlogPost', BlogPostSchema);

//permet au fichier d'être exporté vers le index JS pour permettre sa déclaration sous const
module.exports = BlogPost;
