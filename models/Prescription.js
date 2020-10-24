const mongoose = require('mongoose');

const PrescriptionSchema = new mongoose.Schema({
    patientID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'patient',
        required: true,
    },
    drug: {
        type: String,
        required: true,
    },
    units: {
        type: String,
        required: true,
    },
    directions: {
        type: String,
        required: true,
    },
    notes: {
        type: String,
    },
    startDate: {
        type: Date,
        default: Date.now,
    },
    endDate: {
        type: Date,
    },
});

module.exports = Prescription = mongoose.model(
    'prescription',
    PrescriptionSchema
);
