const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./models/Contact');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());

require('./routes/contactRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // like the main.js file, or main.css file!
  app.use(express.static('client/build'));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
