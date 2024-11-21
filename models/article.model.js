const mongoose = require("mongoose");

// Article Schema
const ArticleSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    excerpt: {
        type: String,
    },
    medium: {
        type: Object,
    },
    type: {
        type: String,
    },
    url: {
        type: String,
        required: true,
    },
    _model: {
        type: String,
        required: true,
        default: "article",
    },
});

module.exports = mongoose.model("Article", ArticleSchema);
