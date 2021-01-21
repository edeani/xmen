process.env.PROFILE = process.env.PROFILE || "dev";
global.config_  = global.config_ || {
    connectionDatabase:{
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        connectTimeout  : process.env.MYSQL_CONNECT_TIMEOUT,
        acquireTimeout  : process.env.MYSQL_ACQUIRE_TIMEOUT,
        timeout         : process.env.MYSQL_TIMEOUT
    }
};

module.exports.connectionDatabase = global.config_.connectionDatabase;

