const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');

// Get Users
router.get('/getUsers', (req, res, next) => {
  User.getUsers(parseInt(req.query.limit), (err, values) => {
    res.json(values)
  });
});

// Register
router.post('/register', (req, res, next) => {
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    auth_level: "standard_user"
  });

  User.addUser(newUser, (err, user) => {
    if(err){
      res.json({success: false, msg:'Failed to register user'});
    } else {
      res.json({success: true, msg:'User registered'});
    }
  });
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if(err) throw err;
    if(!user){
      return res.json({success: false, msg: 'User not found'});
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch){
        const token = jwt.sign({payload:user}, config.secret, {
          expiresIn: 604800 // 1 week
        });

        return res.json({
          success: true,
          token: 'JWT '+token,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            auth_level: user.auth_level
          }
        });
      } else {
        //return res.json({success: false, msg: 'Wrong password'});
        //res.json({success: false, msg: 'Wrong password'});
        res.send(403);
      }
    });
  });
});

// Profile
router.get('/profile/:username', (req, res, next) => {
  User.getUserByUsername(req.params.username, (err, values) => {
    res.json(values)
  });
});

// Save this for the admin section possibly
//router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
//  res.json({user: req.user});
//});

module.exports = router;
