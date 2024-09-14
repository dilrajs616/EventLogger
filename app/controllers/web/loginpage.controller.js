const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('@models/user.model')
const Session = require('@models/session.model');
const crypto = require('crypto');

router.get('/', (req, res) => 
{
    if(req.cookies.user_id){
        return res.redirect('/');
    }
    res.render('web/helper/login', {layout:"layouts/layout.ejs"});
});

router.post('/', async (req, res) => {
    const { email, password } = req.body;
    const user_agent = req.headers['user-agent'];
    try {
        const rows = await User.read(email);        
        if (rows.length === 0) {
            return res.redirect('/redirect?message=User Not Found'); // Use return here
        }
        const user = rows[0];
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.redirect('/redirect?message=Incorrect Password'); // Use return here
        }
        const session_id = crypto.randomBytes(16).toString('hex');
        const expiry = new Date(Date.now() + 30 * 60 * 1000 * 48).toISOString(); // Use ISO format

        await Session.add(session_id, user.id, user_agent, expiry);
        res.cookie('session_id', session_id, { httpOnly: true, maxAge: 30 * 60 * 1000 * 48 });
        res.cookie('user_id', user.id);
        res.redirect('/');
    } catch (error) {
        console.error(error);
        return res.redirect('/redirect?message=Internal Server Error'); // Use return here
    }
});

module.exports = router;