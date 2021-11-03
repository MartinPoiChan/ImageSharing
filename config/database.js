//Make the vaiables an env
var mysql =require('mysql');
module.exports = mysql.createConnection
({
  host: "localhost",
  user: "Admin123",
  password: "Admin12345679!",
  database: "image"
});
//defualt to 3306 