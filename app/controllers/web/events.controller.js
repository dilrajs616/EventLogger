const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const Event = require('@models/event.model');
const getNum = require('@models/id.model');
const authenticate = require('@middlewares/auth.middleware')

// Configure Multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/files/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.post('/add', authenticate, upload.single('certificate'), async (req, res) => {
    try {
        const teacherId = req.cookies.user_id;
        const { name, date, host_name, topic } = req.body;
        const certificate = req.file;

        if (!certificate) {
            console.error('No file uploaded.');
            return res.status(400).send('No file uploaded.');
        }
        console.log('Uploading certificate:', certificate.filename);

        // Respond with the URL of the uploaded certificate
        const certificatePath = `/files/${certificate.filename}`;
        
        const db_num = await getNum.read('event');
        const idNum = db_num + 1;
        const id = 'E0' + idNum;

        const result = await Event.add(id, teacherId, name, host_name, date, topic, certificatePath);

        console.log('Event added:', result);

        await getNum.add(idNum, 'event');

        return res.redirect('/');
    } catch (error) {
        console.error('Error adding event:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/teacher', authenticate, async(req, res) => {
    const { teacherId } = req.body;
    const eventCount = await getNum.read('event');

    const eventTable = await Event.read(teacherId);

    eventTable.forEach(event => {
      event.date = new Date(event.date).toISOString().split('T')[0];
    });
    res.render('web/admin/teacherEvent', {
      layout: 'layouts/adminLayout.ejs',
      eventCount,
      eventTable
    });
});

router.post('/certificate', authenticate, (req, res) => {
    try {
        let teacherRole = true;
        const { certificate, role } = req.body;
        console.log(certificate);
        console.log(role)

        if (role === 'admin'){
            teacherRole = false;
        }
        if (teacherRole){
            res.render('web/teacher/certificate', {
                layout: 'layouts/teacherLayout.ejs',
                certificate
            });
        }
        if(!teacherRole){
            res.render('web/teacher/certificate', {
                layout: 'layouts/adminLayout.ejs',
                certificate
            });
        };
    } catch (error) {
        console.error(error);
        res.status(500).send('Error on the server side');
    }
});

module.exports = router;
