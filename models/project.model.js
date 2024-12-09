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
    modified_date: {
        type: Date,
        default: Date.now,
    },
    created_date: {
        type: Date,
        default: Date.now,
        immutable: true
    },
    order: {
        type: Number,
    },
    iframeUrl: {
        type: String,
    },
    _model: {
        type: String,
        required: true,
        default: "project",
        immutable: true
    },
});

module.exports = mongoose.model("Project", ProjectSchema);
