
const express = require('express');

// setup bcrypt
const bcyrpt = require('bcrypt');
const saltRounds = 10;


// App Setup
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Template Engine Config
app.set('view engine', 'ejs');

//static acts on the first instance of index within the public folder
app.use(express.static('./public'));

// this communicates with our database
const models = require('./models');

// get method for each template
app.get('/', (req, res) => {
    // The render method takes the name of the HTML
    // page to be rendered as input
    // This page should be in the views folder
    // in the root directory.
    res.render('home');
});

app.get('/sign-in', (req, res) => {
    res.render('signIn');
});

app.get('/sign-up', (req, res) => {
    res.render('signUp');
})

// post methods
app.post('/sign-up', async (req, res) => {
    console.log(req.body);
    const userName = req.body.email;
    const password = req.body.password;
    const hash = await bcyrpt.hash(password, saltRounds)
    console.log(hash)
    console.log(userName)

    models.user.create({useremail: userName, userpassword: hash}).then((newUser) => {
        console.log(newUser)
        res.render('home');
    })
});

app.post('/sign-in', (req, res) => {
    console.log(req.body);
    res.render('home');
});

// the server and port
app.listen(8080, function () {
    console.log('The app is now listening on port 8080...');
});