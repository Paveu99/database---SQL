const express = require('express');
const { engine } = require('express-handlebars');
const methodOverride = require('method-override');
const { homeRouter } = require('./routers/homeRouter');
const { starterRouter } = require('./routers/starterRouter');
const { handlebarsHelpers } = require('./utils/show');

const app = express();

app.use(methodOverride('_method'));
app.use(express.urlencoded({
  extended: true,
}));
app.use(express.static('public'));
app.use(express.json());
app.engine('.hbs', engine({
  extname: '.hbs',
  // helpers: handlebarsHelpers(),
}));
app.set('view engine', '.hbs');

app.use('/', starterRouter);
app.use('/client', homeRouter);

app.listen(3000, 'localhost', () => {
  console.log('Listening on http://localhost:3000');
});
