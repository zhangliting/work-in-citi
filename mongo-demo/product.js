var mongoose = require('mongoose');
var Category = require('./category');
var fx = require('./fx');

var productSchema ={
    name:{type: String, required: true},
    pictures: [{type: String, match: /^http:\/\//i}],
    price: {
        amount: {
            type:Number, 
            required:true,
            set: function(v){
                this.internal.approximatePriceUSD = 
                    v / (fx()[this.price.currency] || 1);
                    return v;
            }
        },
        currency: {
            type:String,
            enum: ['USD','EUR','GBP'],
            requierd: true,
            set: function(v){
                this.internal.approximatePriceUSD = 
                    this.price.amount / (fx()[v] || 1);
                return v;
            }
        }
    },
    category: Category.categorySchema,
    internal:{
        approximatePriceUSD: Number
    }
};

var schema= new mongoose.Schema(productSchema);

// var currencySymbols={
//     'USD': '$',
//     'EUR': '€',
//     'GBP': '£'
// };

schema.virtual('displayPrice').get(function(){
    return fx()[this.price.currency] +
        '' + this.price.amount;
});

schema.set('toObject', {virtual:true});
schema.set('toJSON',{virtual:true});

module.exports = schema;
module.exports.productSchema = productSchema;