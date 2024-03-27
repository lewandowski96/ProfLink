const Business = require("../models/business.model");

// Create a new business record
exports.createBusiness = async (req, res) => {
    try {
        const newBusiness = new Business(req.body);
        const savedBusiness = await newBusiness.save();
        res.status(201).json(savedBusiness);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Get a specific business record by ID
exports.getBusinessById = async (req, res) => {
    try {
        const business = await Business.findById(req.params.id);
        if (!business) throw Error("Business not found");
        res.json(business);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

// Update a business record
exports.updateBusiness = async (req, res) => {
    try {
        const updatedBusiness = await Business.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedBusiness);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a business record
exports.deleteBusiness = async (req, res) => {
    try {
        await Business.findByIdAndDelete(req.params.id);
        res.json({ message: "Business deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get all business records
exports.getAllBusinesses = async (req, res) => {
    try {
        const businesses = await Business.find();
        res.json(businesses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new advertisement for a business
exports.createAdvertisement = async (req, res) => {
    const { id } = req.params;
    try {
        const business = await Business.findById(id);
        if (!business) throw Error("Business not found");

        business.advertisementDetails.push(req.body);
        const savedBusiness = await business.save();
        res.status(201).json(savedBusiness);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update an advertisement for a business
exports.updateAdvertisement = async (req, res) => {
    const { businessId, adId } = req.params;
    try {
        const business = await Business.findById(businessId);
        if (!business) throw Error("Business not found");

        const ad = business.advertisementDetails.id(adId);
        if (!ad) throw Error("Advertisement not found");

        ad.set(req.body);
        const savedBusiness = await business.save();
        res.json(savedBusiness);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete an advertisement for a business
exports.deleteAdvertisement = async (req, res) => {
    const { businessId, adId } = req.params;
    try {
        const business = await Business.findById(businessId);
        if (!business) throw Error("Business not found");

        business.advertisementDetails.id(adId).remove();
        const savedBusiness = await business.save();
        res.json(savedBusiness);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get all advertisements for a business by ID
exports.getAllAdvertisementsByBusinessId = async (req, res) => {
    const { id } = req.params;
    try {
        const business = await Business.findById(id);
        if (!business) throw Error("Business not found");

        const advertisements = business.advertisementDetails;
        res.json(advertisements);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

// Create a new testimonial for a business
exports.createTestimonial = async (req, res) => {
    const { id } = req.params;
    try {
        const business = await Business.findById(id);
        if (!business) throw Error("Business not found");

        business.customerTestimonials.push(req.body);
        const savedBusiness = await business.save();
        res.status(201).json(savedBusiness);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update a testimonial for a business
exports.updateTestimonial = async (req, res) => {
    const { businessId, testimonialId } = req.params;
    try {
        const business = await Business.findById(businessId);
        if (!business) throw Error("Business not found");

        const testimonial = business.customerTestimonials.id(testimonialId);
        if (!testimonial) throw Error("Testimonial not found");

        testimonial.set(req.body);
        const savedBusiness = await business.save();
        res.json(savedBusiness);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a testimonial for a business
exports.deleteTestimonial = async (req, res) => {
    const { businessId, testimonialId } = req.params;
    try {
        const business = await Business.findById(businessId);
        if (!business) throw Error("Business not found");

        business.customerTestimonials.id(testimonialId).remove();
        const savedBusiness = await business.save();
        res.json(savedBusiness);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get all testimonials for a business by ID
exports.getAllTestimonialsByBusinessId = async (req, res) => {
    const { id } = req.params;
    try {
        const business = await Business.findById(id);
        if (!business) throw Error("Business not found");

        const testimonials = business.customerTestimonials;
        res.json(testimonials);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};
