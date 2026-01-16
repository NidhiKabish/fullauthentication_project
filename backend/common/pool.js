const   _CONF		= require('../config/index').init(),
        mysql       = require('mysql');


var pool  = mysql.createPool({
    connectionLimit : 10,
    host        : _CONF.mysql.host,
    user        : _CONF.mysql.user,
    password    : _CONF.mysql.password,
    port        : _CONF.mysql.port,
    database    : _CONF.mysql.database,
  });

module.exports = pool;