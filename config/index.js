/**
 * Created by rakesh on 24/9/17.
 */
    var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

    var config={

            db:{
                mongo:{url:'mongodb://localhost:27017/socialtry',sessionSecret: 'ytjfXIAd8TA1ULSN2e45'}
            },
          JWTsecret: 'Ob8GcD4LyZpw5hvUtpXh!'

    }
module.exports = config;
