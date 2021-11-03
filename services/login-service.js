const 
    {getPassword} = require('../repository/login-repo'),
    {decrypt, encrypt} = require("../services/crypto-service"),
    {response} = require("../functions/response-object")

const TestLogin = async (id, pass) => {
    let test = await getPassword(id);
    console.log(test);
    if(test.length == 0){
        return response('No user', '', 401, false)
    }
    let plain = await decrypt(test[0].pass);
    if(pass==''){
        return response('No password provided', '', 401, false)
    }
    else if(plain == pass){
        return response('Successful login.', test, 200, true)
    }
    else{
        return response('Something broke', '', 401, false)
    }
};

module.exports = {
    TestLogin
};