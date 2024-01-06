// patientController.js
const Doctor = require('../models/doctorModel');
const Patient = require('../models/patientModel');

module.exports = {
  async create(req, res) {
    try {
      const {firstname,lastname,age,adress,phonenumber,socialnumber,gender,doctorID}=req.body
      const patient = new Patient({
        firstname,
        lastname,age,
        adress,
        phonenumber,
        socialnumber,
        gender,
        doctorID,
      });


      try {
        await patient.save();
        console.log('Patient saved successfully!');
      } catch (saveError) {
        console.error('Error saving patient:', saveError.message);
        // Handle the error as needed
      }
 
      

      res.status(201).json({ message: 'Patient created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async get(req, res) {
    try {
      const { patientId } = req.params;

      const patient = await Patient.findById(patientId);

      if (!patient) {
        return res.status(404).json({ error: 'Patient not found' });
      }

      res.status(200).json({ patient });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  async getAll(req, res) {
    try {
      const patients = await Patient.find();
  
      if (!patients || patients.length === 0) {
        return res.status(404).json({ error: 'No patients found' });
      }
  
      res.status(200).json({ patients });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  

  async update(req, res) {
    try {
      const { patientId } = req.params;

      // Find the patient by ID
      const patient = await Patient.findByIdAndUpdate(patientId, req.body, { new: true });

      if (!patient) {
        return res.status(404).json({ error: 'Patient not found' });
      }

      res.status(200).json({ message: 'Patient updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};