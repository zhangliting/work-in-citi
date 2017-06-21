var mongoose = require('mongoose');
var userSchema = require('./user');

var User = mongoose.model('User', userSchema);

var u = new User({
    profile:{username: 'vkarpov15'}
});

modifyUserProfile(u, {
    picture: 'http://pbs.twimg.com/profile_images/550304223036854272/Wwmwuh2t.png'
});

function modifyUserProfile(user, profile, callback){
    user.profile = profile;
    user.save(function(error, user){

    });
}