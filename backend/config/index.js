exports.init = function() {
    return {
        // serverurl: "http://localhost/knowexapi/",

        mysql: {
            client: "mysql",

            host: "localhost",

            user: "root",

            password: "",
            
            port: 3306,

			database		: "authenticate_db",

            timezone: "utc",

            multipleStatements: true,

            charset: "utf8mb4",
        },
        secret: "@&*(29783-23019@!$&^^1!98%%",
       
    };
};
