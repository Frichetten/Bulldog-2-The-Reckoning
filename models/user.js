const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// const config = require('../config/database');

// User Schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  auth_level: {
    type: String,
    required: false,
  },
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback) {
  User.findById(id, callback);
};

module.exports.getUsers = function(number, callback) {
  let query = User.find({}).select({'username': 1, 'name': 1, '_id': 0})
    .limit(number);
  query.exec(function(err, info) {
    callback(null, info);
  });
};

module.exports.getUserByUsername = function(username, callback) {
  const query = {username: username};
  User.findOne(query, callback).select({
    'username': 1,
    'name': 1,
    '_id': 0,
    'email': 1,
    'auth_level': 1,
  });
};

module.exports.getUserPassword = function(username, callback) {
  const query = {username: username};
  User.findOne(query, callback);
};

module.exports.addUser = function(newUser, callback) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
};

module.exports.comparePassword = function(candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if (err) throw err;
    callback(null, isMatch);
  });
};
