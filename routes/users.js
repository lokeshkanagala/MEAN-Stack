const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

//Register

router.post('/register', (req, res, next) => {
    console.log("at routes.users.js");
    let newUser = new User({
        name : req.body.name,
        email : req.body.email,
        username : req.body.username,
        password : req.body.password
    });
    User.addUser(newUser, (err, user) => {
        if(err) {
            res.json({success: false, msg : "Failed to register User"})
        } else {
            res.json({success: true, msg: "User registered"});
        }
    });
});

//Authenticate

router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if(err) throw err;
        if(!user) {
            return res.json({success: false, msg: "User not found"});
        } else {
            User.comparePassword(password, user.password, (err, isMatch) => {
                if(err) throw err;
                // If Password Matches go-on to create a JWT token
                if(isMatch) {
                    const token = jwt.sign(user, config.secret, {
                        expiresIn : 604800 // 1 Week
                    });
                    res.json({
                        success: true,
                        token: 'JWT ' + token,
                        user: {
                            id: user._id,
                            name: user.name,
                            username: user.username,
                            email: user.email
                        } 
                    });
                } else {
                    return res.json({success: false, msg: "wrong password"});
                }
            });
        }
    })
});

//Profile / letting passport know to use jwt strategy by send jwt as a parameter

router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    res.json({user: req.user});
});

module.exports = router;