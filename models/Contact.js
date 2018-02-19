const mongoose = require('mongoose');
const { Schema } = mongoose;

const contactSchema = new Schema({
  email: String,
  message: String,
});

module.exports = contactSchema;
