const sanitizeFileName = (name) => name.replace(/[^a-zA-Z0-9._-]/g, "_");
module.exports = { sanitizeFileName };
