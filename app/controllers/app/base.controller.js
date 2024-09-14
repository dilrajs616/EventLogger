//testing lazyg
const express = require('express');
const router = express.Router();

//Declaration
const config = require('config');
const { error } = require('winston');
  // config.has('db_mysql.name') // Return true/false
  // config.get('/db_mysql.name') //Returns value

// router.get('/', authMiddleware('admin:get') ,(req, res) =>{
//   console.log(req.headers)
//   res.send("Hello ")
// })
module.exports = router;