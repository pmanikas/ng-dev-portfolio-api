const mongoose = require("mongoose");

// Project Schema
const ProjectSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    },
    type: {
        type: String,
    },
    _model: {
        type: String,
        required: true,
        default: "project",
    },
});

module.exports = mongoose.model("Project", ProjectSchema);
