// LOCAL DEVELOPMENT ! \\
var mysql =require('mysql');
module.exports = mysql.createConnection
({
  host: "localhost",
  user: "Admin123",
  password: "Admin12345679!",
  database: "laundry"
});

//defualt to 3306 