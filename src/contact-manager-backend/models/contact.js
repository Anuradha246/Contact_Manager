const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    dob: Date,
    info: String,  // Retaining the 'info' field
});

module.exports = mongoose.model('Contact', contactSchema);
