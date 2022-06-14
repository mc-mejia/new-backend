const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  status: {
    type: String
  },
  banks: [
    {
      label:{
        type: String,
        required: true
      },
      balance:{
        type: String,
        required: true
      },
      type:{
        type: String,
        required: true
      }
    }
  ],
  ben: [
    {
     beneficiaryId: {
      type: String,
      required: true
     },
     bankAccountNumber: {
      type: String,
      required: true
     } 
    }
  ],
  transactions: [
    {
      date:{
        type: String,
        required: true
      },
      amount:{
        type: String,
        required: true
      },
      type:{
        type: String,
        required: true
      },
      benId:{
        type: String,
        required: true
      },
      bankId:{
        type: String,
        required: true
      },
      reason:{
        type: String,
        required: false
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
