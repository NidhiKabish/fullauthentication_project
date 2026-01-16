const authRoutes = require('./auth_route');



module.exports.init = (app) => {
    

    console.log("Initializing all routes...");

    try {


        app.use('/',authRoutes);


       

    } catch (err) {
        console.error("Error initializing routes:", err);
    }
};