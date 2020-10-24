const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Patient = require('../../models/Patient');
const Prescription = require('../../models/Prescription');
const Visit = require('../../models/Visit');
/*
Make access private in get all patients
add auth to other functions too
*/

// @router  GET api/patient
// @desc    Get all patient's id, name + number
// @access  Public  - make private
router.get('/', async (req, res) => {
    try {
        const patients = await Patient.find().select({
            firstName: 1,
            lastName: 1,
            phoneNumber: 1,
        });

        return res.json(patients);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: 'Server Error' });
    }
});

// @router  GET api/patient/:patientID
// @desc    Get patient and data by patient id
// @access  Public
router.get('/:patientID', async (req, res) => {
    try {
        const patient = await Patient.findOne({
            _id: req.params.patientID,
        });

        if (!patient) {
            return res.status(404).json({ msg: 'Patient not found' });
        }

        const prescriptions = await Prescription.find({
            patientID: req.params.patientID,
        });
        const visits = await Visit.find({ patientID: req.params.patientID });

        res.json({
            patient: patient,
            visits: visits,
            prescriptions: prescriptions,
        });
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Patient not found' });
        }
        console.error(error.message);
        res.status(500).json({ msg: 'Server Error' });
    }
});

// @router  POST api/patient
// @desc    Create or update
// @access  Private
router.post(
    '/',
    [
        check('fistName', 'Fist name is required').notEmpty(),
        check('lastName', 'Last name is required').notEmpty(),
        check('phoneNumber', 'phone number is required').notEmpty().isNumeric,
        check('gender', 'Gender is required').notEmpty(),
        check('birthdate', 'Birthdate is required').notEmpty().isDate(),
        check('gender', 'Gender is required').notEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            firstName,
            lastName,
            phoneNumber,
            cnic,
            gender,
            birthdate,
            firstLine,
            secondLine,
            thirdLine,
            city,
            province,
        } = req.body;

        // Build patient object
        const patientFields = {
            firstName,
            lastName,
            phoneNumber,
            gender,
            birthdate,
            cnic: cnic || null,
            address: {
                firstLine: firstLine || null,
                secondLine: secondLine || null,
                thirdLine: thirdLine || null,
                city: city || null,
                province: province || null,
            },
        };

        try {
            let patient = await Patient.findOne({
                firstName: fistName,
                lastName: lastName,
                phoneNumber: phoneNumber,
            });

            if (patient) {
                // update existing patient
                patient = await Patient.findOneAndUpdate(
                    { firstName, lastName, phoneNumber },
                    { $set: patientFields },
                    { new: true }
                );
            } else {
                // Create patient
                patient = new Patient(patientFields);
            }

            await patient.save();
            res.json(patient);
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ msg: 'Server Error' });
        }
    }
);

// @router  DELETE api/patient/:patientID
// @desc    Delete patient by ID
// @access  Private
router.delete('/:patientID', async (req, res) => {
    try {
        await Patient.findOneAndDelete({ _id: req.params.patientID });

        // delete related prescriptions and visits
        await Prescription.deleteMany({ patientID: req.params.patientID });
        await Visit.deleteMany({ patientID: req.params.patientID });

        res.json({ msg: 'Patient deleted' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: 'Server Error' });
    }
});

module.exports = router;
