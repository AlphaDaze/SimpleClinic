const mongoose = require('mongoose');

const VisitSchema = new mongoose.Schema({
    patientID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'patient',
        required: true,
    },
    patientIssue: {
        type: String,
    },
    examination: {
        type: String,
    },
    diagnosis: {
        type: String,
    },
    vitals: {
        whiteBlood: {
            type: Number,
        },
        haemoglobin: {
            type: Number,
        },
        creatinine: {
            type: Number,
        },
        urea: {
            type: String,
        },
        // TODO: XRAY
        // xray: {
        //  type: String,
        //n},
    },
    followup: {
        type: Date,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = Visit = mongoose.model('visit', VisitSchema);
