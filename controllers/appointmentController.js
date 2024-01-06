const Appointment = require('../models/appointmentModel');

module.exports={

async create(req, res) {
  try {
    const {date,time,illness,description}=req.body
    const appointment = new Appointment({
      date,
      time,
      illness,
      description,
    });

    await patient.save();

    res.status(201).json({ message: 'Appointment created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
},




async  getAll(req, res) {
    try {
      // Find all patients
      const appointments = await Appointment.find();
  
      if (!appointments || appointments.length === 0) {
        return res.status(404).json({ error: 'No Appointments found' });
      }
  
      res.status(200).json({ appointments });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  async  get(req, res) {
    try {
      const { appointmentId } = req.params;

      // Find the appointment by ID
      const diagnostic = await Patient.findById(appointmentId);

      if (!appointment) {
        return res.status(404).json({ error: 'Apointment not found' });
      }

      res.status(200).json({ appointment });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}