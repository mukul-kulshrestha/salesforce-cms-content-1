var createError = require('http-errors');
var express = require('express');
var path = require('path');
var request = require("request");
var bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require(path.join(path.resolve(),'routes/index'));
var getCMSImagesRouter = require(path.join(path.resolve(),'routes/getCMSImages'));
var getCMSDocumentsRouter = require(path.join(path.resolve(),'routes/getCMSDocuments'));
var getCMSNewsRouter = require(path.join(path.resolve(),'routes/getCMSNews'));

var app = express();

//var port = process.env.PORT || 3000;
var port = process.env.PORT;
console.log('PORT: '+port);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/slds', express.static(__dirname + '/node_modules/@salesforce-ux/design-system/'));
app.use('/sfsdk', express.static(__dirname + '/node_modules/blocksdk/'));


app.use('/', indexRouter);
app.use('/getCMSImages', getCMSImagesRouter);
app.use('/getCMSDocuments', getCMSDocumentsRouter);
app.use('/getCMSNews', getCMSNewsRouter);


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


app.listen(port);

module.exports = app;