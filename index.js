const express = require('express');
require('dotenv').config();

const generateRoute = require('./routes/generate');
const problemsRoute = require('./routes/problems');

const app = express();

app.use(express.json());

//const cors = require('cors');
//app.use(cors());

// Mount routes
app.use('/api/generate', generateRoute);
app.use('/api/problems', problemsRoute);

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
});