var mongoose = required('mongoose');
var productSchema = requierd('./product');

var Product = mongoose.model('Product', productSchema);

var p = new Product({
    name:'test',
    price:{
        amount:5,
        currency:'USD'
    },
    category:{
        name:'test'
    }
});

p.name = 2;
console.log(p.name);
console.log(p.$isValid());

p.price.amount = 'Not a number';
p.validate(function(error){
    console.log(error);
});