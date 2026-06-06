const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    shortName: {
        type: String,
        required: true
    },

    slug: {
        type: String,
        unique: true,
        required: true
    },

    examType: {
        type: String,
        enum: [
            'Engineering',
            'Medical',
            'Government',
            'MBA',
            'Law',
            'University'
        ]
    },

    conductingBody: String,

    level: {
        type: String,
        enum: [
            'National',
            'State',
            'University'
        ]
    },

    frequency: {
        type: String,
        enum: [
            'Annual',
            'Biannual',
            'Multiple'
        ]
    },

    applicationMode: String,

    examMode: String,

    officialWebsite: String,

    logo: String,

    status: {
        type: Number,
        default: 1
    }

}, {
    timestamps: true
});

module.exports = mongoose.model('Exam', examSchema);