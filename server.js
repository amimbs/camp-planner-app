
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
const grocery_list = require('./models/grocery_list');

//Session secret setup
app.use(cookieParser());
app.use(
    session({
        key: 'user_sid',
        secret: 'unicorns',
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: false,
            maxAge: 6000 * 600
        }
    })
);

// cookie info
// this clears the cookeis of the user id in the browser, should the server crash 
app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');
    }
    next();
});


//session checker to check for logged in users woah ok this needs to be completed
var sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('/dashboard');
    } else {
        next();
    }
}

// get method for each template

//if the server goes down, we send them back to signin
app.get('/', sessionChecker, (req, res) => {
    res.redirect('sign-in');
});

app.get('/campsite', (req, res) => {
    res.render('campsite');
})

// routing methods
app.route('/sign-up')
    .get(sessionChecker, async (req, res) => {
        return res.render('signUp')
    })
    .post(async (req, res) => {
        const { email, password, first_name, last_name } = req.body;
        if (!email || !password || !first_name || !last_name) {
            //we need to make this an alert
            return res.json({ error: 'Email, password, first and last name are required' });
        }

        bcyrpt.hash(password, saltRounds, (err, hash) => {
            models.user.create({
                useremail: email,
                userpassword: hash,
                first_name: first_name,
                last_name: last_name

            }).then((user) => {
                console.log('success');
                return res.redirect('/sign-in');
            }).catch(e => {
                let errors = [];
                console.log(e)
                e.errors.forEach((error) => {
                    errors.push(error.message)
                })
                return res.status(400).json({ error: errors });
            })
        })
    })
    ;

app.route('/sign-in')
    .get(sessionChecker, async (req, res) => {
        res.render('signIn');
    })
    .post(async (req, res) => {
        const { email, password } = req.body;
        const foundUser = await models.user.findOne({ where: { useremail: email }, raw: true });
        if (!foundUser) {
            return res.json({ errors: 'invalid user email' });
        };
        bcyrpt.compare(password, foundUser.userpassword, (err, match) => {
            if (match) {
                //gets the user from the db and adds the user data to the session
                req.session.user = foundUser;
                res.redirect('/dashboard');
            } else {
                res.json({ error: 'Incorrect Password' });
            }
        })
    })
    ;

app.get('/dashboard', async (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        const campPlans = await models.camp_plan.findAll({ where: { user_id: req.session.user.id }, raw: true });
        res.render('dashboard', { campPlans });
    } else {
        res.redirect('/sign-in')
    }
});

app.post('/api/saveCampPlan', (req, res) => {
    console.log(req.body)
    models.camp_plan.create({
        name: req.body.name,
        user_id: req.session.user.id
    }).then((camp_plan) => {
        console.log('success');
        let grocery_list = [];
        req.body.grocery_list.forEach(grocery_item => {
            grocery_list.push({
                grocery_item: grocery_item,
                quantity: 1,
                camp_plan_id: camp_plan.id
            });
        });
        models.grocery_list.bulkCreate(grocery_list);

        let gear_list = [];
        req.body.gear_list.forEach(gear_item => {
            gear_list.push({
                gear_item: gear_item,
                quantity: 1,
                camp_plan_id: camp_plan.id
            });
        });
        models.gear_list.bulkCreate(gear_list);
        return res.status(200).json({ name: req.body.name })
    }).catch(e => {
        let errors = [];
        console.log(e)
        e.errors.forEach((error) => {
            errors.push(error.message)
        })
        return res.status(400).json({ error: errors });
    })
});

//hook this up to a button
app.get('/logout', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        res.clearCookie('user_sid')
        res.redirect('/sign-in')
    } else {
        res.redirect('/sign-in')
    }
});


// the server and port
app.listen(8080, function () {
    console.log('The app is now listening on port 8080...');
});