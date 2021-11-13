const {getImgTest, insertImg, deleteImg, getImg, getImageTags, getUserSevice,editImg} = require("../services/image-service")

const lll = async (user, type) => {
    const result = await getImgTest(user,type);
    return (result);
};

const insertImage = async (url, geo, date, user, name, size, type, down, tags, captured)=>{
  const result = await insertImg(url, geo, date, user, name, size, type, down, tags, captured)
  return (result);
}

const deleteImage = async (url)=>{
  const result = await deleteImg(url)
  return (result);
}

const editImage = async (geo, date, down, tags, capture)=>{
  const result = await editImg(geo, date, down, tags, capture)
  return (result);
}

const getImage = async (down)=>{
  const resultImg = await getImg(down)
  const resultTag = await getImageTags(down)
  let result = {
    img: resultImg,
    tag: resultTag
  }
  return (result);
}
const getImageTagsController = async (down)=>{
  const result = await getImgTags(down)
  return (result);
}

  module.exports = {
    lll,
    insertImage,
    deleteImage,
    getImage,
    getImageTagsController,
    editImage
  };
  