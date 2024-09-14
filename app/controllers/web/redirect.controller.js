const express = require('express');
const router = express.Router();
const authenticate = require('@middlewares/auth.middleware')

router.get('/', authenticate, (req, res) => {
    const message = req.query.message || 'No message provided';
    res.render('web/helper/redirect', { layout: 'layouts/layout.ejs', message });
});

module.exports = router;
