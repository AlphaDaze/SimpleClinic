const express = require('express');
const router = express.Router();

const Patient = require('../../models/Patient');
const Prescription = require('../../models/Prescription');

// @router  GET api/patient/prescription/:prescriptionID
// @desc    Get prescription by prescription id
// @access  Public
router.get('/:prescriptionID', async (req, res) => {
    try {
        const prescription = await Prescription.findOne({
            _id: req.params.prescriptionID,
        });
        
        if (!prescription) {
            return res.status(404).json({ msg: 'Prescription not found' });
        }

        res.json(prescription);
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Prescription not found' });
        }
        console.error(error.message);
        res.status(500).json({ msg: 'Server Error' });
    }
});

// @router  POST api/patient/prescription/new/:patientID
// @desc    Add a prescription for a patient
// @access  Private
router.post('/:patientID', async (req, res) => {
    const { drug, units, directions, notes, startDate, endDate } = req.body;

    const prescriptionFields = {
        patientID: req.params.patientID,
        drug: drug || null,
        units: units || null,
        directions: directions || null,
        notes: notes || null,
        startDate: startDate || null,
        endDate: endDate || null,
    };

    try {
        const patient = await Patient.findOne({
            _id: req.params.patientID,
        });

        if (!patient) {
            return res.status(404).json({ msg: 'Patient not found' });
        }

        prescription = new Prescription(prescriptionFields);
        await prescription.save();

        res.json(prescription);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error' });
    }
});

// @router  PUT api/patient/prescription/:prescriptionID
// @desc    Put/modify prescription by prescription id
// @access  Public
router.put('/:prescriptionID', async (req, res) => {
    const { drug, units, directions, notes, startDate, endDate } = req.body;

    const prescriptionFields = {
        drug: drug || null,
        units: units || null,
        directions: directions || null,
        notes: notes || null,
        startDate: startDate || null,
        endDate: endDate || null,
    };

    try {
        prescription = await Prescription.findOne({
            _id: req.params.prescriptionID,
        });

        if (!prescription) {
            return res.status(404).json({ msg: 'Prescription not found' });
        }

        prescriptionFields.patientID = prescription.patientID;

        prescription = await Prescription.findOneAndUpdate(
            { _id: req.params.prescriptionID },
            { $set: prescriptionFields },
            { new: true }
        );

        await prescription.save();
        res.json(prescription);
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Prescription not found' });
        }
        console.error(error.message);
        res.status(500).json({ msg: 'Server Error' });
    }
});

// @router  DELETE api/patient/prescription/:prescriptionID
// @desc    Delete prescription by ID
// @access  Private
router.delete('/:prescriptionID', async (req, res) => {
    try {
        await Prescription.findOneAndDelete({ _id: req.params.prescriptionID });
 
        res.json({ msg: 'Prescription deleted' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: 'Server Error' });
    }
});

module.exports = router;
