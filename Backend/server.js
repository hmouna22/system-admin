const express = require('express');
const assestsRouter = require('./routes/assets');
const interventionsRouter = require('./routes/interventions');
const cors = require('cors');
const app = express();

// Middleware to analyse JSON data in the requests
app.use(express.json());
app.use(cors());

// Routes
app.use('/asset', assestsRouter);
app.use('/intervention', interventionsRouter);

// Lauch the server
app.listen(3000, () => {
  console.log(`Server running on http://localhost:${3000}`);
});