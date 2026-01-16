


const MongoClient   = require('mongodb').MongoClient,
      mongoConfig   = require('./mongo_config'),
      q             = require('q');

let connectioObj = {};

let dbName    = mongoConfig.dbName,
    url       = mongoConfig.url;
// const options = {
//         keepAlive           : true,
//         useUnifiedTopology  : true,
//         useNewUrlParser     : true,
//         poolSize            : 10,
//     };
let mongoDb;

connectioObj.init = function(){

    const deferred = q.defer();

    MongoClient.connect(url, {}).then( function( db) {

            mongoDb =  db.db(dbName);
            // console.log("mongoDb----mongoDb",mongoDb)
            deferred.resolve(mongoDb);
    })
    .catch( function(err){
        
        console.log("errror----insert",err)
        deferred.resolve(false);
    });

    return deferred.promise;
}

module.exports = connectioObj;