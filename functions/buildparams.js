function buildParams(req, additionalData) {
  var res = {...additionalData};
    res.uid = req.session.uid
    res.fname = req.session.fname
    res.lanme = req.session.lanme
    res.loggedin = req.session.loggedin
      if(req.session.loggedin) {
        res.role = req.session.role;
      }
  return res;
}

module.exports = {buildParams};