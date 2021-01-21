"use strict";

let mysql_ = require("promise-mysql");
const configuration_ = require("../configuration/config");

let getObjectConnection = () => {
    return {
      host: global.config_.connectionDatabase.host,
      user: global.config_.connectionDatabase.user,
      password: global.config_.connectionDatabase.password,
      database: global.config_.connectionDatabase.database,
      connectTimeout  : parseFloat(global.config_.connectionDatabase.connectTimeout),
      acquireTimeout  : parseFloat(global.config_.connectionDatabase.acquireTimeout),
      timeout         : parseFloat(global.config_.connectionDatabase.timeout)
    };
  };


/**
 * This function execute a  query
 * @param {Query for execute} sql
 */
module.exports.query = async (sql) => {
    var objConn = getObjectConnection();
  
    var connectionMysql = await mysql_.createConnection(objConn);
  
    let result_ = [];
    try {
      await connectionMysql.beginTransaction();
      result_ = await connectionMysql.query(sql, "");
      await connectionMysql.commit();
    } catch (error_query) {
      console.error("Error query ".concat(error_query));
      await connectionMysql.rollback();
      throw Error("Error accessing data "+error_query);
    } finally {
      connectionMysql.destroy();
    }
  
    return result_;
  };
  
