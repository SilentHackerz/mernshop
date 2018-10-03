const createError = require('http-errors');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');

const itemsRoutes = require('./routes/api/items')

const app = express();

// mongodb database connection (standard boilerplate mongo connection code)
mongoose.connect('mongodb://zain:abc123@ds121593.mlab.com:21593/zain', {useNewUrlParser: true})
    .then(() => console.log("Mongodb connection established"))
    .catch((err) => console.error(err))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));

app.use(express.json());

// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());

//Below line handles when JSON is sent via POST request. body-parser puts this data in request.body.
app.use(bodyParser.json());

// Below line parses query string data in the URL (e.g. /profile?id=5) and puts this in request.query.
app.use(bodyParser.urlencoded({'extended' : 'true'}));


// Below middleware serves static assets from my public folder. If I want to rename or move the public folder, I can change the path here.
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api/items', itemsRoutes)
/* The above line is for mounting the router on the app. Meaning whenever, I am going to  localhost:5000 - itemsRoutes route will be rendered. app.use() is intended for binding middleware to my application. The path is a "mount" or "prefix" path and limits the middleware to only apply to any paths requested that begin with it.

In other words it means, I want localhost:5000 route to go and mount itemsRoutes
The second argument to app.use means I am referring to './routes/api/items' file which I imported above
So, whatever path I am adding in < router.get('/', callback()) > in file in './routes/api/items' - that will only be added after the path, I am specifying here in this main app.js file. This is exactly the setup I have in my DevBook project and its the standard boilerplate.
*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
