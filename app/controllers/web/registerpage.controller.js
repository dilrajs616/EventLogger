const express = require('express');
const router = express.Router();
const subjectTable = require('@models/subject.model');
const User = require('@models/user.model');
const getNum = require('@models/id.model')
const bcrypt = require('bcryptjs');

const asyncHandler = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

router.post('/', asyncHandler(async (req, res) => {
    try {
        const { name, email, password, subject } = req.body;
        
        const rows = await User.read(email);
        if ( rows.length > 0) {
            return res.redirect(`/redirect?message=Email already in use`);
        }
        
        const db_num = await getNum.read('teacher');
        const idNum = db_num + 1;
        const id = 'T0' + idNum;
        console.log(idNum, id);
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await User.add(id, name, email, hashedPassword, subject)
        
        await getNum.add(idNum, 'teacher')
        console.log('User added successfully');
        
        return res.redirect(`/redirect?message=Successfully Registered. Waiting for approval`);
    } catch (error) {
        console.error('Error during registration:', error);
        return res.redirect(`/redirect?message=Something failed during registration. Please try again.`);
    } 
}));

router.get('/', async (req, res) => 
{
  try {
    subjects = await subjectTable.read();
    res.render('web/helper/register', { layout: 'layouts/layout.ejs', subjects });
  } catch (err) {
      console.error('Error fetching subjects:', err);
      res.status(500).send('Server Error');
  }
})

module.exports = router;