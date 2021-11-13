const 
    pool =  require('../config/database'),
    mysql = require('mysql');

const getAllImages = (user) => {
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
                    conn.query('SELECT * FROM img i JOIN img_access a ON i.img_id = a.img_id JOIN users u ON i.owner = u.user_id WHERE a.user_id=?', 
                    [user], 
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
                                    resolve(results)
                                }
                            });
                        }
                    });
                }    
            });
        });
    })
};

const getOneImage = (down) => {
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
                            conn.query('SELECT * FROM img WHERE img_id = ?', 
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

const getImageTag = (down) => {
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
                            conn.query('SELECT * FROM tags WHERE img_id = ?', 
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

const getOwnerImages = (user) => {
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
                    conn.query('SELECT * FROM img i JOIN users u ON i.owner = u.user_id WHERE i.owner=?', 
                    [user], 
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
                                    resolve(results)
                                }
                            });
                        }
                    });
                }    
            });
        });
    })
};

const getSharedImages = (user) => {
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
                    conn.query('SELECT * FROM img i JOIN img_access a ON i.img_id = a.img_id JOIN users u ON i.owner = u.user_id WHERE i.owner!=? AND a.user_id = ?', 
                    [user, user], 
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
                                    resolve(results)
                                }
                            });
                        }
                    });
                }    
            });
        });
    })
};

const insertMeta =(url, geo, date, user, name, size, type, down, tags, captured) =>{
    let lastKey = 0
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
                    conn.query('INSERT INTO img(url, location, capture_date, owner, img_name, size, type, down_name, captured_by) VALUES(?,?,?,?,?,?,?,?,?)', 
                    [url, geo, date, user, name, size, type, down, captured], 
                    function(err, results) {
                        if (err) {          //Query Error (Rollback and release conn)
                            conn.rollback(function() {
                                conn.release();
                                reject(err)
                                return
                            });
                        }
                        else {
                            conn.query('SELECT LAST_INSERT_ID() AS lastKey', 
                            [], 
                            function(err, results) {
                                if (err) {          //Query Error (Rollback and release conn)
                                    conn.rollback(function() {
                                        conn.release();
                                        reject(err)
                                        return
                                    });
                                }
                                else{
                                    lastKey = results[0].lastKey
                                    conn.query('INSERT INTO img_access(user_id, img_id) VALUES(?,?)', 
                                    [user, lastKey], 
                                    function(err, results) {
                                        if (err) {          //Query Error (Rollback and release conn)
                                            conn.rollback(function() {
                                                conn.release();
                                                reject(err)
                                                return
                                            });
                                        }
                                        else {
                                            tags.forEach(tag => {
                                                var sql_employees = 'INSERT INTO tags(img_id, tag_name) VALUES(?,?)'; 
                                                let inserts = [lastKey,tag]
                                                let sql = mysql.format(sql_employees, inserts);
                                                console.log('SQL QUERY: '+sql);
                                                conn.query(sql, 
                                                function(err, results) {
                                                    if (err) {          //Query Error (Rollback and release conn)
                                                        conn.rollback(function() {
                                                            console.log(tag);
                                                            console.log('Error: '+err);
                                                            conn.release();s
                                                            reject(err)
                                                            return
                                                        });
                                                    }
                                                });
                                            }); 
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
                                    })
                                }
                            });
                        }
                    });
                }    
            });
        });
    });
}

const editMeta =(geo, date, down, tags, capture) =>{
    let Key = 0
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
                    conn.query('UPDATE img SET location = ?, capture_date = ?, captured_by = ?', 
                    [geo, date, capture], 
                    function(err, results) {
                        if (err) {          //Query Error (Rollback and release conn)
                            conn.rollback(function() {
                                conn.release();
                                reject(err)
                                return
                            });
                        }
                        else {
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
                                else{
                                    key = results[0].img_id
                                    conn.query('DELETE FROM tags WHERE img_id = ?', 
                                    [key], 
                                    function(err, results) {
                                        if (err) {          //Query Error (Rollback and release conn)
                                            conn.rollback(function() {
                                                conn.release();
                                                reject(err)
                                                return
                                            });
                                        }
                                        else {
                                            tags.forEach(tag => {
                                                var sql_employees = 'INSERT INTO tags(img_id, tag_name) VALUES(?,?)'; 
                                                let inserts = [key,tag]
                                                let sql = mysql.format(sql_employees, inserts);
                                                console.log('SQL QUERY: '+sql);
                                                conn.query(sql, 
                                                function(err, results) {
                                                    if (err) {          //Query Error (Rollback and release conn)
                                                        conn.rollback(function() {
                                                            console.log(tag);
                                                            console.log('Error: '+err);
                                                            conn.release();
                                                            reject(err)
                                                            return
                                                        });
                                                    }
                                                });
                                            }); 
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
                                    })
                                }
                            });
                        }
                    });
                }    
            });
        });
    });
}


const deleteImage =(down) =>{
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
                            console.log(results);
                            key = results[0].img_id
                            conn.query('DELETE FROM tags WHERE img_id = ?', 
                            [key], 
                            function(err, results) {
                                if (err) {          //Query Error (Rollback and release conn)
                                    conn.rollback(function() {
                                        conn.release();
                                        reject(err)
                                    });
                                }
                                else{
                                    conn.query('DELETE FROM img_access WHERE img_id = ?', 
                                    [key], 
                                    function(err, results) {
                                        if (err) {          //Query Error (Rollback and release conn)
                                            conn.rollback(function() {
                                                conn.release();
                                                reject(err)

                                            });
                                        }
                                        else {
                                            conn.query('DELETE FROM img WHERE img_id = ?', 
                                            [key], 
                                            function(err, results) {
                                                if (err) {          //Query Error (Rollback and release conn)
                                                    conn.rollback(function() {
                                                        console.log(tag);
                                                        console.log('Error: '+err);
                                                        conn.release();
                                                        reject(err)
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
                                                            resolve(true)
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    })
                                }
                            });
                        }
                    });
                }    
            });
        });
    });
}


module.exports = {getAllImages, getOwnerImages, getSharedImages, insertMeta, deleteImage, getOneImage, editMeta, getImageTag}