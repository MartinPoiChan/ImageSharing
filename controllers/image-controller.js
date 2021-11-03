const {TestStuff} = require("../services/image-service")
const GetApples = async () => {
    const result = await TestStuff();
    return (result);
  };

  module.exports = {
    GetApples
  };
  