var mongoose = require('mogoose');
var _ = require('underscore');

module.exports = function(wagner){
    mongoose.connect('mongodb://localhost:27017/test');

    var Category = mongoose.model('Category', require('./category'), 'categories');
    var Product = mongoose.model('Product', require('./product'), 'products');
    var User = mongoose.model('User', require('./user'), 'users');

    var models = {
        Category: Category,
        Product: Product,
        User: User
    }
    
    _.each(models, function(value, key){
        wagner.factory(key, function(){
            return value;
        });
    });

    return models;
};