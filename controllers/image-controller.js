const {getImgTest, insertImg, deleteImg} = require("../services/image-service")

const lll = async (user, type) => {
    const result = await getImgTest(user,type);
    return (result);
};

const insertImage = async (url, geo, date, user, name, size, type, down, tags)=>{
  const result = await insertImg(url, geo, date, user, name, size, type, down, tags)
  return (result);
}

const deleteImage = async (url)=>{
  const result = await deleteImg(url)
  return (result);
}


  module.exports = {
    lll,
    insertImage,
    deleteImage
  };
  