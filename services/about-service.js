const 
  path = require('path'),
  fs = require('fs'),
  express = require('express'),
  {GetClients} = require('../repository/about-repo'),
  {buildParams} = require("../functions/buildparams");
  
// const fileUpload = require('express-fileupload'),
//   serveIndex = require('serve-index'),
//   rimraf     = require("rimraf")

const TestStuff = async () => {
    let test = await GetClients();
    console.log('service: '+test[0].fname);
    return test
  };

const FileUp = async(ext)=>{
  
}

module.exports = {
  TestStuff
};