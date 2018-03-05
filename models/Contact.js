const mongoose = require('mongoose');

const { Schema } = mongoose;

const contactSchema = new Schema({
  name: String,
  email: String,
  message: String,
  dateSent: Date,
});

mongoose.model('contact', contactSchema);
