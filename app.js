const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

mongoose.connect(config.database);
mongoose.connection.on('connected', () => {
  console.log('Connected to database ' + config.database);
});

mongoose.connection.on('error', (err) => {
  console.log('Database error: ' + err);
  console.log('Failed database connection. Exiting');
  exit();
});

const app = express();

const users = require('./routes/users');

const port = 8080;

app.use(express.static(path.join(__dirname, 'angular-src/dist')));
app.use(bodyParser.json());

// Passport
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);

app.get('/', (req, res) => {
 res.send('How\'s it going');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'angular-src/dist/index.html'));
});

app.listen(port, () => {
  console.log('Server started on port ' + port);
});
