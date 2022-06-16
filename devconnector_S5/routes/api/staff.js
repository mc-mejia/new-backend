const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Load Input Validation
const validateRegisterInput = require('../../validation/register');
const validateStaffInput = require('../../validation/staff');
// Load User model
const Staff = require('../../models/Staff');
const User = require('../../models/User');

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Users Works' }));

// @route   GET api/staff/register
// @desc    Register staff user
// @access  Public
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = 'Email already exists';
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: '200', // Size
        r: 'pg', // Rating
        d: 'mm' // Default
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route   GET api/staff/add
// @desc    Register staff
// @access  Private
router.post('/add',
(req, res) => {
  const { errors, isValid } = validateStaffInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // Find user by name
  Staff.findOne({ staffname: req.staffname }).then(staff => {
   
    const newStaff = new Staff({
        staffname: req.body.staffname,
        type: req.body.type,
        password: req.body.password
      });


      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newStaff.password, salt, (err, hash) => {
          if (err) throw err;
          newStaff.password = hash;
          newStaff
            .save()
            .then(staff => res.json(staff))
            .catch(err => console.log(err));
        });
      });
    
  });
});

// @route   GET api/staff/all
// @desc    Get all staff
// @access  Public
router.get('/all', (req, res) => {
    const errors = {};
  
    Staff.find()
      .populate()
      .then(staffList => {
        if (!staffList) {
          errors.nostaff = 'There are no staff accounts';
          return res.status(404).json(errors);
        }
  
        res.json(staffList);
      })
      .catch(err => res.status(404).json({ profile: 'There are no staff accounts' }));
  });

// @route   Delete api/staff/delete
// @desc    Delete a staff account
// @access  Public
  router.delete(
    '/delete/:staff_id',
    (req, res) => {
      Staff.findOneAndRemove( { _id: req.id }).then(() => {
          res.json({ success: true });
      });
    }
  );

  // @route   GET api/staff/login
// @desc    Login Staff / Returning JWT Token
// @access  Public
router.post('/login', (req, res) => {
  const { errors, isValid } = validateStaffInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const staffname = req.body.staffname;
  const password = req.body.password;

  // Find user by name
  Staff.findOne({ staffname }).then(user => {
    // Check for user
    if (!user) {
      errors.staffname = 'User not found';
      return res.status(404).json(errors);
    }

    // Check Password
    bcrypt.compare(req.body.password, user.password).then(isMatch => {
      if (isMatch) {
        // User Matched
        const payload = { id: user.id, staffname: user.staffname}; // Create JWT Payload

        // Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token
            });
          }
        );
      } else {
        errors.password = 'Password incorrect';
        return res.status(400).json(errors);
      }
    });
  });
});

module.exports = router;
