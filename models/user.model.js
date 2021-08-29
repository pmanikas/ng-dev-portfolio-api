const mongoose = require('mongoose');

// User Schema
const UserSchema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  image: {
    type: String,
  },
  _model: {
    type: String,
    required: true,
    default: 'user'
  }
});

const User = module.exports = mongoose.model('User', UserSchema);

// Used by passport - DON'T delete until decoupled
module.exports.getById = async (id) => await User.findById(id);