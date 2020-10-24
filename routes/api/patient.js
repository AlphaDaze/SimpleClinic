const express = require('express');
const router = express.Router();

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
    async (req, res) => {
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
            country
        } = req.body;


        // check if required values are present
        let valueErrors = "";

        if (!firstName) {
            valueErrors += "firstName empty, ";
        }
        if (!lastName) {
            valueErrors += "lastName empty, ";
        }
        if (!phoneNumber) {
            valueErrors += "phoneNumber empty, ";
        }
        if (!gender) {
            valueErrors += "gender empty, ";
        }
        if (!birthdate) {
            valueErrors += "birthdate empty, ";
        }
        if (valueErrors) {
            return res.status(400).json({ errors: valueErrors });
        }


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
                country: country || "Pakistan",
            },
        };

        try {
            let patient = await Patient.findOne({
                firstName: firstName,
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
