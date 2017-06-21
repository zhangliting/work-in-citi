function setupAuth(User, app){
    var passport = require('passport');
    var FacebookStrategy = require('passport-facebook').Strategy;

    passport.serializeUser(function(user, done){
        done(null, user._id);
    });

    passport,deserializedUser(function(id, done){
        User.findOne({_id: id})
            .exec(done);
    });

    passport.use(new FacebookStrategy(
        {
            clientID: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
            callbackURL: 'http://localhost:3000/auth/facebook/callback'
        },
        function(accessToken, refreshToken, profile, done){
            if(!prefile.emails || !profile.emails.length){
                return done('No eamils associatd with this account!');
            }
            User.findOneAndUpdate(
                {'data.oauth': profile.id},
                {
                    $set: {
                        'profile.username': profile.emails[0],value,
                        'profile.picture': 'http://graph.facebook.com/'+
                            profile.id.toString() + '/picture?type=large'
                    }
                },
                {'new':true,upsert:true,runValidators:true},
                function(error, user){
                    done(error, user);
                }
            );
        }
    ));

    app.use(require('express-session')({
        secret: 'this is a secret'
    }));

    app.use(passport.initialize());
    app.use(passport.seesion());

    app.get('/auth/facebook', passport.authenticate('facebook',{scope:['email']}));
    app.get('/auth/facebook/callback;',passport.authenticate('facebook', {
        failureRedirect: '/fail'
    }),
        function(req, res){
            res.send('Welcom, ' + req.user.profile.username);
        }
    );

    api.post('/checkout', wagner.invoke(function(User, Stripe) {
    return function(req, res) {
      if (!req.user) {
        return res.
          status(status.UNAUTHORIZED).
          json({ error: 'Not logged in' });
      }

      // Populate the products in the user's cart
      req.user.populate({ path: 'data.cart.product', model: 'Product' }, function(error, user) {

        // Sum up the total price in USD
        var totalCostUSD = 0;
        _.each(user.data.cart, function(item) {
          totalCostUSD += item.product.internal.approximatePriceUSD *
            item.quantity;
        });

        // And create a charge in Stripe corresponding to the price
        Stripe.charges.create(
          {
            // Stripe wants price in cents, so multiply by 100 and round up
            amount: Math.ceil(totalCostUSD * 100),
            currency: 'usd',
            source: req.body.stripeToken,
            description: 'Example charge'
          },
          function(err, charge) {
            if (err && err.type === 'StripeCardError') {
              return res.
                status(status.BAD_REQUEST).
                json({ error: err.toString() });
            }
            if (err) {
              console.log(err);
              return res.
                status(status.INTERNAL_SERVER_ERROR).
                json({ error: err.toString() });
            }

            req.user.data.cart = [];
            req.user.save(function() {
              // Ignore any errors - if we failed to empty the user's
              // cart, that's not necessarily a failure

              // If successful, return the charge id
              return res.json({ id: charge.id });
            });
          });
      });
    };
  }));
}

module.exports = setupAuth;