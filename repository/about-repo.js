const db =  require('../config/database')

//DB connection test 
db.connect(function(err) {
    if (err){
      throw err
    }
    console.log("Connected to DB laundry");
});

const GetClients = (req, res) => {
    return new Promise((resolve, reject)=> {
        let sql_SelectClient = "SELECT * FROM clients";
        db.query(sql_SelectClient, function(err, result) {
            if (err){
                reject(err)
                return
            }
            resolve(result)
        });
    })
};

module.exports = {GetClients}