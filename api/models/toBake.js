const mongoose = require('mongoose');

const toBakeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Cake'},
    quantity: { type: Number, default: 1
    
    }
});

module.exports = mongoose.model('ToBake', toBakeSchema);