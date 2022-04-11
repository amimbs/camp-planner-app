
const express = require('express');

// session setup
const session = require('express-session');
const cookieParser = require('cookie-parser');

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
const user = require('./models/user');

//Session secret setup
app.use(cookieParser());
app.use(
    session({
        secret: 'unicorns',
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: false,
            maxAge: 6000 * 60
        }
    })
);

// get method for each template

app.get('/sign-up', (req, res) => {
    res.render('signUp');
})

app.get('/sign-in', (req, res) => {
    res.render('signIn');
});

// post methods
//need to add a uniqure clause to the email
app.post('/sign-up', async (req, res) => {
    // const userName = req.body.email;
    // const password = req.body.password;
    const { email, password, first_name, last_name } = req.body;
    console.log(req.body)
    if (!email || !password || !first_name || !last_name) {
        res.json({ error: 'Email, password, first and last name are require' })
        return;
    }
    // const hash = await bcyrpt.hash(password, saltRounds)

    // models.user.create({ useremail: userName, userpassword: hash }).then((newUser) => {
    //     // console.log(newUser)

    //     res.render('dashboard');

    bcyrpt.hash(password, saltRounds, (err, hash) => {
        models.user.create({
            useremail: email,
            userpassword: hash,
            first_name: first_name,
            last_name: last_name

        }).then((user) => {
            console.log('success');
            res.redirect(
                '/sign-in'
            )
        }).catch(e => {
            let errors = [];
            console.log(e)
            e.errors.forEach((error) => {
                errors.push(error.message)
            })
            res.json({ error: errors })
        })
    })
});

app.post('/sign-in', async (req, res) => {
    // console.log(req.body);
    // const userName = req.body.email;
    // const password = req.body.password;
    const { email, password } = req.body;

    const foundUser = await models.user.findOne({ where: { useremail: email }, raw: true });

    if (!foundUser) {
        return res.json({ errors: 'invalid user email' });
    }

    // here password which is equal to what the user created in sign-up, is being compared to the hash from the user table under user password
    // attemping to store and use the session data
    bcyrpt.compare(password, foundUser.userpassword, (err, match) => {
        if (match) {
            req.session.user = foundUser.first_name
            res.redirect('/dashboard')
        } else {
            res.json({ error: 'Incorrect Password' })
        }
    })
});

app.get('/dashboard', (req, res) => {
    if (req.session.user) {
        console.log(req.session.user)
        res.json({ success: true })
    } else ({ error: 'please login' })
    // res.render('dashboard');
});

// the server and port
app.listen(8080, function () {
    console.log('The app is now listening on port 8080...');
});