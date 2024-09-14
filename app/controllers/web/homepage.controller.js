const express = require('express');
const router = express.Router();
const User = require('@models/user.model');
const authenticate = require('@middlewares/auth.middleware');

router.get('/', authenticate, async(req, res) => {
  const idList = await User.getIds();
  const user_id = req.cookies.user_id;
  if (idList.includes(user_id)){
    result = await User.findById(user_id);
    console.log(result[0].role);
    if (result[0].role === 'teacher'){
      res.redirect('teacher');
    }
    if (result[0].role === 'admin'){
      res.redirect('admin');
    }
  } 
  return res.redirect('/login');
});

module.exports = router;
