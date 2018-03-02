require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// MongoDB
require('./db/mongoose');
require('./models/Contact');

const app = express();

app.use(bodyParser.json());

require('./routes/contactRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/dist'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
