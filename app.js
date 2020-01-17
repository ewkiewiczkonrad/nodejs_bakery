const express = require('express');
const app = express();
const morgan = require('morgan');

const cakeRoutes = require('./api/routes/cake');
const toBakeRoutes = require('./api/routes/toBake');

app.use(morgan('dev'));


app.use('/cake', cakeRoutes);
app.use('/toBake', toBakeRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status=404;
    next(error);
});

app.use((error, req, res, next) =>{
    res.status(err.status ||500);
    res.json({
        error:{
            message: error.message
        }
    });
});

module.exports = app;