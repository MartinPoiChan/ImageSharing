const 
    {insertUser} = require('../repository/register-repo'),
    {decrypt, encrypt} = require("../services/crypto-service"),
    {response} = require("../functions/response-object")

const insertUsers = async (fname, lname, email, pass) => {
    let cfname, clanme, cemail, cpass
    cfname = encrypt(fname)
    clanme = encrypt(lname)
    cemail = encrypt(email)
    cpass = encrypt(pass)

    let result = await insertUser(cfname, clanme, cemail, cpass)
    if (result == true) {
        return response('Successful register.','', 201, true)
    }
    else{
        return response('Error register.', '', 400, true)
    }
};

module.exports = {
    insertUsers
};