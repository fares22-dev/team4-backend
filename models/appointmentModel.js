const mongoose = require('mongoose');
const appointmentSchema = new mongoose.Schema({
    date: {
      type: Date,
      required:true,
    },
    time: {
        type: Date,
        required:true,
      },
    illness: {
        type: Date,
        required:true,
      },
    description: {
        type: String,
        required:true,
    }
    //fares yjbd the pateint 
  });
  const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;