const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const cakeRoutes = require('./api/routes/cake');
const toBakeRoutes = require('./api/routes/toBake');
const userRoutes = require('./api/routes/user.js');

mongoose.connect('mongodb+srv://admin:'+
process.env.MONGO_ATLAS_PW+
'@nodejs-z1j8g.mongodb.net/test?retryWrites=true&w=majority',{
    useNewUrlParser: true
});
mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.getHeader("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type, Accept, Authorization");

if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
}
next();
});

app.use('/cake', cakeRoutes);
app.use('/toBake', toBakeRoutes);
app.use('/user', userRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;