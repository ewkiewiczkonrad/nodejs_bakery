const mongoose = require('mongoose');

const cakeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number
});

module.exports = mongoose.model('Cake', cakeSchema);