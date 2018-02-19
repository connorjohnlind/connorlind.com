const keys = require('../config/keys');

module.exports = app => {

  // send off email (reset form on client side)
  app.post('/api/contact', async (req, res) => {
    res.send({});
  });
};
