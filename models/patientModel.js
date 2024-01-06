const mongoose = require('mongoose');
const patientSchema = new mongoose.Schema({
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
        type: String,
        required: true,
      },
      age: {
        type: String,
        required: true,
      },
      adress: {
        type: String,
        required: true,
      },
      phonenumber: {
        type: String,
        required: true,
      },
      socialnumber: {
        type: String,
        required: true,
      },
      gender: {
        type: String,
        required: true,
      },
      doctorID: {
        type: String,
        required: true,
      },
      

  });
  
  const Patient = mongoose.model('Patient', patientSchema);
  
  module.exports = Patient;  