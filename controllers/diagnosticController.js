const Diagnostic = require('../models/diagnosticModel');

async function getAll(req, res) {
    try {
      // Find all patients
      const diagnostics = await Diagnostic.find();
  
      if (!diagnostics || diagnostics.length === 0) {
        return res.status(404).json({ error: 'No patients found' });
      }
  
      res.status(200).json({ diagnostics });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  async function get(req, res) {
    try {
      const { diagnosticId } = req.params;

      // Find the patient by ID
      const diagnostic = await Patient.findById(diagnosticId);

      if (!patient) {
        return res.status(404).json({ error: 'Patient not found' });
      }

      res.status(200).json({ patient });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  