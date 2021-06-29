const express = require('express');
const router = express.Router();

const Patient = require('../../models/Patient');
const Visit = require('../../models/Visit');

// @router  GET api/patient/visit/:visitID
// @desc    Get visit by visit id
// @access  Public
router.get('/:visitID', async (req, res) => {
    try {
        const visit = await Visit.findOne({
            _id: req.params.visitID,
        });

        if (!visit) {
            return res.status(404).json({ msg: 'Visit not found' });
        }

        res.json(visit);
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Visit not found' });
        }
        console.error(error.message);
        res.status(500).json({ msg: 'Server Error' });
    }
});

// @router  POST api/patient/visit/new/:patientID
// @desc    Add a visit for a patient
// @access  Private
router.post('/new/:patientID', async (req, res) => {
    const {
        patientIssue,
        examination,
        diagnosis,
        whiteBlood,
        haemoglobin,
        creatinine,
        urea,
        FEV1,
        FVC,
        followup,
    } = req.body;

    const visitFields = {
        patientID: req.params.patientID,
        patientIssue: patientIssue || null,
        examination: examination || null,
        diagnosis: diagnosis || null,
        followup: followup || null,
        vitals: {
            whiteBlood: whiteBlood || null,
            haemoglobin: haemoglobin || null,
            urea: urea || null,
            creatinine: creatinine || null,
        },
        pft: {
            FEV1: FEV1 || null,
            FVC: FVC || null,
        }
    };

    try {
        const patient = await Patient.findOne({
            _id: req.params.patientID,
        });

        if (!patient) {
            return res.status(404).json({ msg: 'Patient not found' });
        }

        visit = new Visit(visitFields);
        await visit.save();

        res.json(visit);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error' });
    }
});

// @router  PUT api/patient/visit/:visitID
// @desc    Put/modify visit by visit id
// @access  Public
router.put('/:visitID', async (req, res) => {
    const {
        patientIssue,
        examination,
        diagnosis,
        whiteBlood,
        haemoglobin,
        creatinine,
        urea,
        FEV1,
        FVC,
        followup,
    } = req.body;

    const visitFields = {
        patientIssue: patientIssue || null,
        examination: examination || null,
        diagnosis: diagnosis || null,
        followup: followup || null,
        vitals: {
            whiteBlood: whiteBlood || null,
            haemoglobin: haemoglobin || null,
            urea: urea || null,
            creatinine: creatinine || null,
        },
        pft: {
            FEV1: FEV1 || null,
            FVC: FVC || null,
        },
    };

    try {
        visit = await Visit.findOne({
            _id: req.params.visitID,
        });

        if (!visit) {
            return res.status(404).json({ msg: 'Visit not found' });
        }

        visitFields.patientID = visit.patientID;

        visit = await Visit.findOneAndUpdate(
            { _id: req.params.visitID },
            { $set: visitFields },
            { new: true }
        );

        await visit.save();
        res.json(visit);
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Visit not found' });
        }
        console.error(error.message);
        res.status(500).json({ msg: 'Server Error' });
    }
});

// @router  DELETE api/patient/visit/:visitID
// @desc    Delete visit by ID
// @access  Private
router.delete('/:visitID', async (req, res) => {
    try {
        await Visit.findOneAndDelete({ _id: req.params.visitID });

        res.json({ msg: 'Visit deleted' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: 'Server Error' });
    }
});

module.exports = router;
