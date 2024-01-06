const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  speciality: {
    type: String,
    required: true,
  },
  validated: {
    type: Boolean,
    default: false,
  },
  gender:{
    type:String,
    required:true,
  },
  age:{
    type:String,
    required:true,
  },
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;


