// Importing node modules
import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import routes from './routes/main.routes';
// import mongoose from 'mongoose';

const app = express();

// mongoose.connect('mongodb://localhost/intexmailer');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade'); // choose jade views for render without index.jade - index

app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
// app.use('/users', users);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const error = new Error('Page Not Found');
  const message = 'Sorry, but page not found';
  error.status = 404;
  res.render('error', { title: 'Page Not Found', error, message });
  next(error);
});

// arrow functions
app.listen(process.env.PORT || 3000);
