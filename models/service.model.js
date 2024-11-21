const mongoose = require("mongoose");

// Service Schema
const ServiceSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    subtitle: {
        type: String,
    },
    description: {
        type: String,
        required: true,
    },
    _model: {
        type: String,
        required: true,
        default: "service",
    },
});

module.exports = mongoose.model("Service", ServiceSchema);
