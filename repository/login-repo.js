const db =  require('../config/database')

//DB connection test 
const getPassword = (id) => {
    return new Promise((resolve, reject)=> {
        let sql_SelectLogin = "SELECT pass, fname, lname, user_id FROM users where user_id ='"+id+"'";
        console.log(sql_SelectLogin);
        // let sql_SelectLogin = "SELECT ??, ?? FROM ?? where ?? =?";
        // let inserts = ['pass','salt','users','user_id',id]
        // let sql = mysql.format(sql_SelectLogin, inserts);

        db.query(sql_SelectLogin, function(err, result) {
            if (err){
                reject(err)
                return
            }
            resolve(result)
        });
    })
};

module.exports = {getPassword}