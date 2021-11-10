const {insertUsers} = require("../services/register-service")

const insertUserc = async (fname, lname, email, pass) => {
    const result = await insertUsers(fname, lname, email, pass);
    return (result);
  };

module.exports = {
    insertUserc
};
