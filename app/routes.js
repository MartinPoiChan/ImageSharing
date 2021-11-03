//#region Dependancies
const express = require('express');
      app = express();
      //mysql = require('mysql');

//#endregion

//#region Configuration objects
const { StandardResponse } = require('../functions/response-object');
//*: Create a connection to the database
//const connection = mysql.createConnection(databaseConfig);
//#endregion

// Allows an email to be sent with nodemailer without checking if the certificate is secure
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

module.exports = app;