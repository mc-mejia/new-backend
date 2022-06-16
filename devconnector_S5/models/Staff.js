const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const StaffSchema = new Schema({
  staffname: {
    type: String
  },
  password:{
    type: String,
  },
  type: {
    type: String
  }
});

module.exports = Staff = mongoose.model('staff', StaffSchema);
