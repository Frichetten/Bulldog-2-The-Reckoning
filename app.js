const React = require('react');
const ReactDOM = require('react-dom');

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

mongoose.connect(config.database, {useMongoClient:true});
mongoose.connection.on('connected', () => {
  console.log('Connected to database ' + config.database);
});

mongoose.connection.on('error', (err) => {
  console.log('Database error: ' + err);
});

const app = express();

const users = require('./routes/users');

const port = 8080;

app.use(cors());
app.use(express.static(path.join(__dirname, 'views')));
app.use(bodyParser.json());

app.use('/users', users);

app.get('/', (req, res) => {
 // res.send("How's it going");
 ReactDOM.render("<h1>Hello World</h1>", document.getElementById('app'));
});


app.listen(port, () => {
  console.log('Server started on port ' + port);
});


