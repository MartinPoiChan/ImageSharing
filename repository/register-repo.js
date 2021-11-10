const 
    pool =  require('../config/database'),
    mysql = require('mysql');

const insertUser = (fname, lname, email, pass) => {
    return new Promise((resolve, reject)=> {
        pool.getConnection(function(err, conn) {
            conn.beginTransaction(function(err) {
                if (err) {//Transaction Error (Rollback and release conn)
                    conn.rollback(function() {
                        conn.release();
                        reject(err)
                        //Failure
                    });
                } 
                else {
                    //conn.query('SELECT * FROM img', 
                    conn.query('INSERT INTO users(fname, lname, email, pass) VALUES(?,?,?,?)', 
                    [fname, lname, email, pass], 
                    function(err, results) {
                        if (err) {          //Query Error (Rollback and release conn)
                            conn.rollback(function() {
                                conn.release();
                                reject(err)
                                return
                            });
                        }
                        else {
                            conn.commit(function(err) {
                                if (err) {
                                    conn.rollback(function() {
                                        conn.release();
                                        reject(err)
                                        return
                                    });
                                } 
                                else {
                                    conn.release();
                                    resolve(true)
                                }
                            });
                        }
                    });
                }    
            });
        });
    })
};

module.exports = {insertUser}