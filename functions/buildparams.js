function buildParams(req, additionalData) {
  var res = {...additionalData};
    res.tree = 'APPLE TREE'
    //  if(req.session.loggedIn) {
    //    res.role = req.session.role;
    //   }
  return res;
}

module.exports = {buildParams};