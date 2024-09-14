const express = require('express');
const router = express.Router();
const Session = require('@models/session.model'); 

router.get('/logout', async (req, res) => {
    try {
        const session_id = req.cookies.session_id;

        if (!session_id) {
            return res.redirect('/redirect?message=No Session Found');
        }

        await Session.delete(session_id);

        res.clearCookie('session_id');
        res.clearCookie('user_id');

        res.redirect('/redirect?message=Logged out successfully');
    } catch (error) {
        console.error(error);
        res.redirect('/redirect?message=Internal Server Error');
    }
});

module.exports = router;
