
require('dotenv').config();
require('module-alias/register');//Needed for @ in path
const  path = require('path');
//Init Startup Debuger
const debugStartUp = require('debug')('app:startup');

//Init Express App
const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');

//Init Startup Error Logger
require('@startup/errorLog.start')(process);
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, './app/views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use('/css', express.static("src"));
app.use(expressLayouts);
app.use(cookieParser());
app.set('layouts', 'layouts/layout', 'layouts/adminLayout', 'layouts/teacherLayout')


//Init all Databases Here

// require('@databases/createUser.js')(db_client);
// require('@databases/createSession.js')(db_client);




//Simulate an Uncaught Error code
//throw new Error('Thrown Error');

//Simulate an Unhandled Error code
// const p = Promise.reject(new Error('Thrown Rejected Promise Error'));
// p.then(()=> console.log('done'));





//All Routes //./app/routes/
require('@routes/web.routes')(app);
require('@routes/app.routes')(app);




//Define Important Const / Var / Let
const port = process.env.PORT || 3000;
//App Listen Code
app.listen(port, () => {
  debugStartUp(`Node app Started`);
  console.log(`Node app listening on port ${port}`);
})