const {getNonService,insertPermissionService,removePermissionService} = require("../services/permission-service")

const getNonController = async (down) => {
    const result = await getNonService(down);
    return (result);
  };

const insertPermissionController = async (down, user) => {
  const result = await insertPermissionService(down,user);
  return (result);
};

const removePermissionController = async (down, user) => {
  const result = await removePermissionService(down,user);
  return (result);
};

module.exports = {
  getNonController,
  insertPermissionController,
  removePermissionController
};
