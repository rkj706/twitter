/**
 * Created by rakesh on 29/9/17.
 */

const path = require('path');
const rootPath = path.normalize(__dirname);

const express=require('express');
const http=require('http');
const bodyParser=require('body-parser');
const passport=require('passport');
const exphbs  = require('express-handlebars');
const session = require('express-session');
const config=require('./config')
const mongoose=require('mongoose');
const cookieParser = require('cookie-parser');
const connection = mongoose.createConnection(config.db.mongo.url);
const MongoStore = require('connect-mongo')(session);
var Stream = require('stream');
var readline = require('readline');

const User=require('./models/users');
const fs = require('fs');
var app=express();

app.use(bodyParser.json())

app.engine('handlebars', exphbs({
    layoutsDir: rootPath + '/views/layouts/',
    defaultLayout: 'main',
    partialsDir: [rootPath + '/views/partials/']
}));
app.set('views', rootPath + '/views');
app.set('view engine', 'handlebars');
app.use(express.static(path.join(rootPath, 'public')));
app.use(session({
    secret: config.db.mongo.sessionSecret,
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: connection })
}));


app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// Passport Configuration
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});




require('./topChats');
require('./router')(app,passport);
var server=http.createServer(app);
server.listen('5000',function () {

    console.log('server is running');
})
