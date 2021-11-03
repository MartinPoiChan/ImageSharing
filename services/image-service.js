const 
  path = require('path'),
  fs = require('fs'),
  express = require('express'),
  {GetClients} = require('../repository/image-repo'),
  {buildParams} = require("../functions/buildparams");

const TestStuff = async () => {
    let test = await GetClients();
    return test
  };

module.exports = {
  TestStuff
};