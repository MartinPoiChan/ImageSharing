const 
    {getNon, getAll, insertPermission,removePermission} = require('../repository/permission-repo'),
    {response} = require("../functions/response-object");
const { decrypt } = require('./crypto-service');

const getNonService = async (down) => {
    let result = await getAll(down)
    try{
        result.forEach(element => {
            element.fname = decrypt(element.fname)
            element.lname = decrypt(element.lname)       
        });
    }
    catch(err){
        console.log(err);
    }
    return result 
};

const insertPermissionService = async (down, user) => {
    let result = await insertPermission(down, user)
    return result 
};

const removePermissionService = async (down, user) => {
    let result = await removePermission(down, user)
    return result 
};

module.exports = {
    getNonService,
    insertPermissionService,
    removePermissionService
};