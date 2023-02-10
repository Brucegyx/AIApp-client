const express = require('express');
const path = require('path');
require('dotenv').config();
const app = express();
const router = require('./server/server');
const port = process.env.PORT || 8080;


app.use(express.static(path.join(__dirname, '/client')));
app.use(express.json());
app.use('/api',router);
app.all('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '/client/index.html'));
});

app.listen(port, () => {
  console.log('Listening on port ' + port);
});