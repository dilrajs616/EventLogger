const express = require('express');

const viewErrorsMiddleware = require('@middlewares/viewErrors.middleware');

const baseController = require('@controllers/app/base.controller');

 

module.exports = function(app){
 app.use(express.json());
 app.use('/admin/', baseController)
 

  //Log all thrown errors
  app.use(viewErrorsMiddleware);

}