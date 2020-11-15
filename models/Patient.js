const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    birthdate: {
        type: Date,
        required: true,
    },
    cnic: {
        type: String,
        unique: true
    },
    address: {
        firstLine: {
            type: String,
        },
        secondLine: {
            type: String,
        },
        thirdLine: {
            type: String,
        },
        city: {
            type: String,
        },
        province: {
            type: String,
        },
        country: {
            type: String,
            default: "Pakistan"
        }
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = Patient = mongoose.model('patient', PatientSchema);
