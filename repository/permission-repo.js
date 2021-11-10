const 
    pool =  require('../config/database'),
    mysql = require('mysql');

const getNon = (down) => {
    let key = 0
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
                    conn.query('SELECT img_id FROM img WHERE down_name = ?', 
                    [down], 
                    function(err, results) {
                        if (err) {          //Query Error (Rollback and release conn)
                            conn.rollback(function() {
                                conn.release();
                                reject(err)
                                return
                            });
                        }
                        else {
                            key = results[0].img_id
                            conn.query('SELECT * FROM users WHERE user_id NOT IN(SELECT user_id FROM img_access WHERE img_id = ?)', 
                            //conn.query('SELECT * FROM img i JOIN img_access a ON i.img_id = a.img_id JOIN users u ON i.captured_by = u.user_id WHERE u.user_id NOT IN(SELECT user_id FROM img_access WHERE img_id = ?)', 
                            [key], 
                            function(err, results) {
                                if (err) {          //Query Error (Rollback and release conn)
                                    conn.rollback(function() {
                                        conn.release();
                                        reject(err)
                                        return
                                    });
                                }
                                else{
                                    conn.commit(function(err) {
                                        if (err) {
                                            conn.rollback(function() {
                                                conn.release();
                                                reject(err)
                                            });
                                        } 
                                        else {
                                            conn.release();
                                            resolve(results)
                                        }
                                    });
                                }
                            });
                        } 
                    });
                }    
            });
        });
    })
};

const getAccess = (down, user) => {
    let key = 0
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
                    conn.query('SELECT img_id FROM img WHERE down_name = ?', 
                    [down], 
                    function(err, results) {
                        if (err) {          //Query Error (Rollback and release conn)
                            conn.rollback(function() {
                                conn.release();
                                reject(err)
                                return
                            });
                        }
                        else {
                            key = results[0].img_id
                            conn.query('SELECT * FROM img_access WHERE img_id = ? AND user_id = ?', 
                            //conn.query('SELECT * FROM img i JOIN img_access a ON i.img_id = a.img_id JOIN users u ON i.captured_by = u.user_id WHERE u.user_id NOT IN(SELECT user_id FROM img_access WHERE img_id = ?)', 
                            [key, user], 
                            function(err, results) {
                                if (err) {          //Query Error (Rollback and release conn)
                                    conn.rollback(function() {
                                        conn.release();
                                        reject(err)
                                        return
                                    });
                                }
                                else{
                                    conn.commit(function(err) {
                                        if (err) {
                                            conn.rollback(function() {
                                                conn.release();
                                                reject(err)
                                            });
                                        } 
                                        else {
                                            conn.release();
                                            resolve(results)
                                        }
                                    });
                                }
          
                            });
                        } 
                    });
                }    
            });
        });
    })
};

const getAll = (down) => {
    let key = 0
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
                    conn.query('SELECT img_id FROM img WHERE down_name = ?', 
                    [down], 
                    function(err, results) {
                        if (err) {          //Query Error (Rollback and release conn)
                            conn.rollback(function() {
                                conn.release();
                                reject(err)
                                return
                            });
                        }
                        //SELECT *, IF(user_id IN(SELECT user_id FROM img_access WHERE img_id = 55), 1,0) AS Access FROM users
                        else {
                            key = results[0].img_id
                            conn.query('SELECT *, IF(user_id IN(SELECT user_id FROM img_access WHERE img_id = ?), 1,0) AS access FROM users', 
                            //conn.query('SELECT * FROM img i JOIN img_access a ON i.img_id = a.img_id JOIN users u ON i.captured_by = u.user_id WHERE u.user_id NOT IN(SELECT user_id FROM img_access WHERE img_id = ?)', 
                            [key], 
                            function(err, results) {
                                if (err) {          //Query Error (Rollback and release conn)
                                    conn.rollback(function() {
                                        conn.release();
                                        reject(err)
                                        return
                                    });
                                }
                                else{
                                    conn.commit(function(err) {
                                        if (err) {
                                            conn.rollback(function() {
                                                conn.release();
                                                reject(err)
                                            });
                                        } 
                                        else {
                                            conn.release();
                                            resolve(results)
                                        }
                                    });
                                }
                            });
                        } 
                    });
                }    
            });
        });
    })
};

const insertPermission = (down, user) => {
    let key = 0
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
                    conn.query('SELECT img_id FROM img WHERE down_name = ?', 
                    [down], 
                    function(err, results) {
                        if (err) {          //Query Error (Rollback and release conn)
                            conn.rollback(function() {
                                conn.release();
                                reject(err)
                                return
                            });
                        }
                        //SELECT *, IF(user_id IN(SELECT user_id FROM img_access WHERE img_id = 55), 1,0) AS Access FROM users
                        else {
                            key = results[0].img_id
                            conn.query('INSERT INTO img_access(user_id, img_id) VALUES(?,?)', 
                            //conn.query('SELECT * FROM img i JOIN img_access a ON i.img_id = a.img_id JOIN users u ON i.captured_by = u.user_id WHERE u.user_id NOT IN(SELECT user_id FROM img_access WHERE img_id = ?)', 
                            [user,key], 
                            function(err, results) {
                                if (err) {          //Query Error (Rollback and release conn)
                                    conn.rollback(function() {
                                        conn.release();
                                        reject(err)
                                        return
                                    });
                                }
                                else{
                                    conn.commit(function(err) {
                                        if (err) {
                                            conn.rollback(function() {
                                                conn.release();
                                                reject(err)
                                            });
                                        } 
                                        else {
                                            conn.release();
                                            resolve(results)
                                        }
                                    });
                                }
                            });
                        } 
                    });
                }    
            });
        });
    })
};


const removePermission = (down, user) => {
    let key = 0
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
                    conn.query('SELECT img_id FROM img WHERE down_name = ?', 
                    [down], 
                    function(err, results) {
                        if (err) {          //Query Error (Rollback and release conn)
                            conn.rollback(function() {
                                conn.release();
                                reject(err)
                                return
                            });
                        }
                        //SELECT *, IF(user_id IN(SELECT user_id FROM img_access WHERE img_id = 55), 1,0) AS Access FROM users
                        else {
                            key = results[0].img_id
                            conn.query('DELETE FROM img_access WHERE user_id =? AND img_id = ?', 
                            //conn.query('SELECT * FROM img i JOIN img_access a ON i.img_id = a.img_id JOIN users u ON i.captured_by = u.user_id WHERE u.user_id NOT IN(SELECT user_id FROM img_access WHERE img_id = ?)', 
                            [user,key], 
                            function(err, results) {
                                if (err) {          //Query Error (Rollback and release conn)
                                    conn.rollback(function() {
                                        conn.release();
                                        reject(err)
                                        return
                                    });
                                }
                                else{
                                    conn.commit(function(err) {
                                        if (err) {
                                            conn.rollback(function() {
                                                conn.release();
                                                reject(err)
                                            });
                                        } 
                                        else {
                                            conn.release();
                                            resolve(results)
                                        }
                                    });
                                }
                            });
                        } 
                    });
                }    
            });
        });
    })
};
//removePermission
module.exports ={
    getNon,
    getAccess,
    getAll,
    insertPermission,
    removePermission
}