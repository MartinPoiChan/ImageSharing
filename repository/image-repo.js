const db =  require('../config/database')

//DB connection test 
db.connect(function(err) {
    if (err){
      throw err
    }
    console.log("Connected to DB laundry");
});

const GetClients = () => {
    return new Promise((resolve, reject)=> {
        let sql_SelectClient = "SELECT * FROM users";
        db.query(sql_SelectClient, function(err, result) {
            if (err){
                reject(err)
                return
            }
            resolve(result)
        });
    })
};

const insertMeta =(url, geo, date, user) =>{
    return new Promise((resolve, reject)=> {
        let sql_SelectClient = "INSERT into img VALUES()";
        db.query(sql_SelectClient, function(err, result) {
            if (err){
                reject(err)
                return
            }
            resolve(result)
        });
    })
}

module.exports = {GetClients}