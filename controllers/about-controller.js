const {TestStuff} = require("../services/about-service")
const GetApples = async () => {
    const result = await TestStuff();
    console.log('controller: '+result[0].fname);
    return (result);
  };

  module.exports = {
    GetApples
  };
  