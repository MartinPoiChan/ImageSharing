const db =  require('../config/database')

//DB connection test 
const getPassword = (id) => {
    return new Promise((resolve, reject)=> {
        let sql_SelectLogin = "SELECT pass, fname, lname, user_id FROM users where user_id ='"+id+"'";
        console.log(sql_SelectLogin);
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