//permettre le fonctionnement des programmes
const express = require('express');
const app = new express();
const ejs = require('ejs') // permettre le fonctionnement des pages EJS
const flash = require('connect-flash'); // vider les message d'erreur de la sessions


// permettre l'établissement de la base de donnée
const mongoose = require('mongoose');

//permettre le fonctionnement des controllers
const newPostController = require('./controllers/newPost')
const aboutController = require('./controllers/About')
const ContactController = require('./controllers/Contact')
const homeController = require('./controllers/home')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const validateMiddleware = require("./middleware/validationMiddleware");
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const expressSession = require('express-session');
const authMiddleware = require('./middleware/authMiddleware');
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware')
const logoutController = require('./controllers/logout')




//permettre le télécharfement de fichier dans la bd
const fileUpload = require("express-fileupload");
app.use(fileUpload());

//permettre l'utilisation du middleware validate
app.use('/posts/store', validateMiddleware )

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}));
//récupration des sessions
app.use(expressSession({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
    }))

//masquer le nouvel utilisateur et les liens de connexion si un utilisateur est déjà connecté.
global.loggedIn = null;
app.use("*", (req, res, next) => {
loggedIn = req.session.userId;
next()
});

app.use(flash()) // middleware vider les sessions


// créer et connecter la base de donnée
mongoose.connect('mongodb+srv://Test:test@cluster0.wu3vwz9.mongodb.net/test', {useNewUrlParser: true, useUnifiedTopology: true});

// Demande à Ndexpress d'utiliser ejs comme moteur de template
app.set ('view engine','ejs');

// permet de rendre visible tous les fichiers dans le dossier public
app.use(express.static('public'))


// permet d'établir la connection avec le serveur via heruko
let port = process.env.PORT;
if (port == null || port == "") {
port = 4000;
}
app.listen(port, ()=>{
console.log('App listening...')
})



//page affichées via le controller, des routes on appel
app.get('/contact',ContactController)
app.get('/about',aboutController)
app.get('/post/new',authMiddleware,newPostController)
app.get('/',homeController)
app.get('/post/:id',getPostController)
app.get('/auth/register',redirectIfAuthenticatedMiddleware, newUserController)
app.get('/auth/login',redirectIfAuthenticatedMiddleware, loginController)





app.post('/posts/store', authMiddleware,storePostController)
app.post('/users/register',redirectIfAuthenticatedMiddleware, storeUserController)
app.post('/users/login',redirectIfAuthenticatedMiddleware, loginUserController)
app.get('/auth/logout', logoutController)



//page d'erreur 404
app.use((req, res) => res.render('notfound'));





    