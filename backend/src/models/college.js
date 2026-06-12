const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({
    // Identity
    name: {
        type: String,
        required: true,
        trim: true
    },

    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },

    shortName: {
        type: String,
        default: ''
    },

    // Basic Details
    collegeType: {
        type: String,
        enum: ['government', 'private', 'autonomous', 'deemed'],
        default: 'private'
    },

    establishedYear: Number,

    // Location
    cityId: String,
    stateId: String,

    // Branding
    logo: String,
    bannerImage: String,

    // Quick Facts
    nirfRank: Number,

    content: Array,
    image: Array,
    website: String,

    // Small summary for cards & SEO
    shortDescription: {
        type: String,
        maxlength: 500
    },

    // SEO
    seoTitle: String,

    seoDescription: String,

    seoKeywords: [String],

    // Status
    status: {
        type: Number,
        default: 0
    }

}, {
    timestamps: true
});

module.exports = mongoose.model('College', collegeSchema);