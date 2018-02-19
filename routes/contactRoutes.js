const keys = require('../config/keys');

module.exports = app => {
  app.post('/api/contact', async (req, res) => {
    res.send({});
  });
};
