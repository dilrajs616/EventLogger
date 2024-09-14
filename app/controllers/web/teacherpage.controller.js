const express = require('express');
const router = express.Router();
const Event = require('@models/event.model')
const getNum = require('@models/id.model')
const authenticate = require('@middlewares/auth.middleware')

router.get('/', authenticate, async(req, res) => 
{
    // const status = req.session.user.status;
    // if (status === 'kacha') {
        //     return res.redirect('/redirect?message=Waiting for approval from admin side')
        // } else {
            // }
            
    const eventCount = await getNum.read('event');

    const teacherId = req.cookies.user_id; 
    const eventTable = await Event.read(teacherId);

    eventTable.forEach(event => {
      event.date = new Date(event.date).toISOString().split('T')[0];
    });
    res.render('web/teacher/teacherPage', {
      layout: 'layouts/teacherLayout.ejs',
      eventCount,
      eventTable
    });
    
});


module.exports = router;