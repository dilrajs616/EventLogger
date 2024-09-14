const express = require('express');
const router = express.Router();
const User = require('@models/user.model');
const Event = require('@models/event.model');
const getNum = require('@models/id.model');
const authenticate = require('@middlewares/auth.middleware')

router.get('/', authenticate ,(req, res) => {
    return res.redirect('/admin/teachers');
});

router.get('/teachers', authenticate, async(req, res) => 
{
    if (!req.cookies.user_id) {
        console.log('user not in session/cookies');
        return res.redirect('/');
    } 
    const teacherTable = await User.findByStatus('teacher', 'active');
    let emptyResult = false;
    if (teacherTable.length === 0) {  
        emptyResult = true;
    }
    res.render('web/admin/adminPage', {
        layout: "layouts/adminLayout.ejs",
        teacherTable,
        emptyResult
    });

});

router.get('/teachers/pending', authenticate, async(req, res) => 
{
    if (!req.cookies.user_id) {
        console.log('user not in session/cookies');
        return res.redirect('/');
    } 
    const pendingTeacherTable = await User.findByStatus('teacher', 'kacha');
    let newEmptyResult = false; 
    if (pendingTeacherTable.length === 0) {
        newEmptyResult = true; 
    }
    res.render('web/admin/pendingTeachers', { layout: "layouts/adminLayout.ejs", pendingTeacherTable, newEmptyResult });
    
});

router.post('/teacher/delete', authenticate, async (req, res) => {
    const teacherId = req.body.id;
    console.log(teacherId)
    try {
        const result = await User.deleteById(teacherId);
        if (result.rowCount > 0) {  
            return res.redirect('/admin/teachers/pending');
        } else {
            return res.status(404).send('Teacher not found');
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
    }
});

router.post('/teacher/approve', authenticate, async (req, res) => {
    const teacherId = req.body.id;
    try {
        const result = await User.acceptById(teacherId)
        if (result.rowCount > 0) {  
            return res.redirect('/admin/teachers/pending');
        } else {
            return res.status(404).send('Teacher not found');
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
    }
});

router.get('/teachers/events', authenticate, async(req, res) => {
    
    const eventCount = await getNum.read('event');

    const eventTable = await Event.get();

    eventTable.forEach(event => {
      event.date = new Date(event.date).toISOString().split('T')[0];
    });
    res.render('web/admin/teacherEvent', {
      layout: 'layouts/adminLayout.ejs',
      eventCount,
      eventTable
    });
});

module.exports = router;