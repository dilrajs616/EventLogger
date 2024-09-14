const express = require('express');
const homepageController = require('@controllers/web/homepage.controller')
const loginpageController = require('@controllers/web/loginpage.controller');
const registerpageController = require('@controllers/web/registerpage.controller');
const redirectController = require('@controllers/web/redirect.controller');
const adminpageController = require('@controllers/web/adminpage.controller');
const teacherpageController = require('@controllers/web/teacherpage.controller');
const eventController = require('@controllers/web/events.controller');
const logoutController = require('@controllers/web/logout.controller');
const apiErrorsMiddleware = require('@middlewares/apiErrors.middleware');

module.exports = function(app) {
    app.use(express.json()); // Middleware to parse JSON

    // Define routes
    app.use('/', homepageController)
    app.use('/login', loginpageController);
    app.use('/register', registerpageController);
    app.use('/redirect', redirectController);
    app.use('/admin', adminpageController);
    app.use('/teacher', teacherpageController);
    app.use('/events', eventController);
    app.use('/logout', logoutController);

    // Log all API thrown errors
    app.use(apiErrorsMiddleware);
};
