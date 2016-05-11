import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import bodyParser from 'body-parser';
import routes from './routes/main.routes';

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade'); // choose jade views for render without index.jade - index

app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

app.use((req, res, next) => {
  const error = new Error('Page Not Found');
  const message = 'Page not found';
  error.status = 404;
  res.render('error', { title: 'Page Not Found', error, message });
  next(error);
});

app.listen(process.env.PORT || 3000);
