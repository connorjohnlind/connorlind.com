require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// MongoDB
require('./db/mongoose');
require('./models/Contact');

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(express.static('client/dist'));

require('./routes/contactRoutes')(app);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
