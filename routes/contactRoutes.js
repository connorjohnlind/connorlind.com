const mongoose = require('mongoose');
const sgMail = require('@sendgrid/mail');

const Contact = mongoose.model('contact');

sgMail.setApiKey(process.env.SENDGRID_KEY);

module.exports = (app) => {
  app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;

    const contact = new Contact({
      name,
      email,
      message,
      dateSent: Date.now(),
    });

    const msg = {
      to: 'connorjohnlind@gmail.com',
      from: email,
      subject: 'Contact via connorlind.com',
      html: `<h4>Message from ${name}:</h4></br><p>${message}</p>`,
    };

    try {
      await sgMail.send(msg);
      const result = await contact.save();
      res.send(result);
    } catch (e) {
      res.status(400).send(e);
    }
  });
};
