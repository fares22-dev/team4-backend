const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

// Routes for patients
router.route('/patients').post(patientController.create);
router.route('/patients').get(patientController.getAll);
router.route('/patients/:patientId').get(patientController.get);
router.route('/patients/:patientId').put(patientController.update);

router.route('/diagnostics').get(diagnosticController.getAll);
router.route('/diagnostics/:diagnosticId').get(diagnosticController.get);

router.route('/appointments').get(appointmentController.getAll);
router.route('/appointments/:appointmentId').get(appointmentController.get);

module.exports = router;
