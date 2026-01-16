const q = require('q'),
      pool = require('../common/pool'),
      
    { v1: uuidv1 } = require('uuid');





let UserModel = {};

UserModel.alreadyUser = async function(body){

    console.log("req.body[----model-------------", body);
    let deferred = q.defer();
     
    if(body && body.email){
            let sql = `SELECT * FROM admin_user WHERE au_email = ?`;
            
            pool.query(sql,[body.email],(err,results)=>{
                // console.log("results=======model----", results);
                if(err){
                    deferred.resolve(false);
                }
                else{
                    deferred.resolve(true);
                }
            })
    }
    else{
        deferred.resolve(false);


    }

   return deferred.promise;


}


UserModel.insertNewUser = function(body, hashedPassword, token){
    console.log("body------model----", body);
    console.log("hashedPasswordhashedPasswordhashedPassword", hashedPassword);

    let deferred = q.defer();

    if(body && body.name && body.email && hashedPassword){
        let sql = `INSERT INTO admin_user (au_name, au_email, au_password, verification_token, au_created_at, au_updated_at) VALUES(?, ?, ?,?, NOW(), NOW())`;
        pool.query(sql, [body.name, body.email, hashedPassword, token], (err, results) => {
            if(err) {
                console.error("Insert error:", err); 
                deferred.resolve(false);
                return;
            }
            console.log("Insert results:", results);
            if(results && results.affectedRows === 1) {
                console.log("Data inserted successfully");
                deferred.resolve(true);
            } else {
                console.log("Something went wrong11111");
                deferred.resolve(false);
            }
        });
    }
    else{
        console.log("Internal server error");
        deferred.resolve(false);
    }

    return deferred.promise;
}




UserModel.getUserByEmail = async function(email){


    console.log("email======login=======model-=========", email);

    let deferred = q.defer();


    if(email){
        let sql = `SELECT * FROM admin_user WHERE au_email = ?`;
        pool.query(sql, [email], (err,result)=>{

            if(err){
                deferred.resolve(false);
            }
            else{
                   if(result.length > 0){
                    deferred.resolve(result[0]);
                    console.log("resullllltttt==========", result);
                } else {
                    deferred.resolve(false);     
                }
            }
        })


    }

    else{

        deferred.resolve(false);

    }
    
   return deferred.promise;
}


module.exports = UserModel;