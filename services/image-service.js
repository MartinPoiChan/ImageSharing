const 
  {getAllImages, getOwnerImages, getSharedImages, insertMeta, deleteImage} = require('../repository/image-repo'),
  {response} = require("../functions/response-object");
const { decrypt } = require('./crypto-service');

const getImgTest = async (user,type) => {
  let result 
  switch(type) {
    case "all":
      result = await getAllImages(user);
      break;
    case "owner":
      result = await getOwnerImages(user);
      break;
    case "shared":
      result = await getSharedImages(user);
      break;
    default:
      result = await getAllImages(user);
  }
    if(result.length==0){
    return response('No images found', '', 69, true)
  }
  else if(result.length>0){
    result.forEach(element => {
      element.fname = decrypt(element.fname)
      element.lname = decrypt(element.lname)
    });
    return response('Images found', result, 68, true)
  }
  return result
};

const insertImg = async (url, geo, date, user, name, size, type, down, tags) => {
  const tagsSplit = tags.split('#');
  const check = await insertMeta(url, geo, date, user, name, size, type, down, tagsSplit)
  if(check == true){
    return response('Insert image data', '', 201, true)
  }
  return response('Error occured while inserting.', check, 500, false)
}

const deleteImg = async (img_url) => {
  const check = await deleteImage(img_url)
  if(check == true){
    return response('deleted image data', '', 201, true)
  }
  return response('Error occured while deleting.', check, 500, false)
}

const editImg = async () => {

}
module.exports = {
  getImgTest,
  insertImg,
  deleteImg,
  editImg
};