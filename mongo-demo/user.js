var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    profile: {
        username: {
            type: String,
            required: true,
            lowercase: true
        },
        picture: {
            tyep: String,
            required: true,
            match: /^http:\/\//i
        }
    },
    data: {
        oauth: {
            type: String, 
            required: true
        },
        cart: [{
            product: {
                type: mongoose.Schema.Types.ObjectId
            },
            quantity: {
                type: Number,
                default: 1,
                min1
            }
        }]
    }
});