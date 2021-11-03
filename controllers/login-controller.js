const {TestLogin} = require("../services/login-service")

const getlog = async (id, pass) => {
    const result = await TestLogin(id, pass);
    return (result);
  };
  module.exports = {
    getlog
  };
  