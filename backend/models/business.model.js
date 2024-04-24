const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BusinessSchema = new Schema(
    {
        userId: String,
        basicDetails: {
            name: String,
            industry: String,
            organizationType: String,
            organizationSize: String,
            tagline: [String],
            description: String,
            legalBackgroundVerification: Boolean
        },
        productDetails: [
            {
                name: String,
                industry: String,
                description: String,
                image: String,
            },
        ],
        achievementDetails: [
            {
                title: String,
                description: String,
                image: String,
            },
        ],
        customerTestimonials: [
            {
                name: String,
                email: String,
                rating: Number,
                description: String,
            },
        ],
        advertisementDetails: [
            {
                title: String,
                description: String,
                targetAudience: String,
                budget: String,
                image: String,
            },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Business", BusinessSchema);
