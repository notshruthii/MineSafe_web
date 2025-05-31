// app.js
const express = require("express");
const { connectDB } = require("./db.js");
const app = express();
const Worker = require('./models/Worker.js');
const Manager = require('./models/Manager.js');
const { spawn } = require('child_process');
const bodyParser = require('body-parser');
require('dotenv').config();

app.use(bodyParser.json()); // for parsing application/json

// Connect DB and start server
connectDB();

app.listen(process.env.PORT, () => {
  console.log(`App running on port ${process.env.PORT}`);
});

// Health check
app.get("/", (req, res) => {
  res.send("Server is working");
});

// Check workers
app.get('/check-workers', async (req, res) => {
  try {
    const workers = await Worker.find();
    res.json(workers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Check managers
app.get('/check-managers', async (req, res) => {
  try {
    const managers = await Manager.find();
    res.json(managers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// === New: Endpoint to submit worker data and trigger Gemini report generation ===
app.post('/submit-worker-data', async (req, res) => {
  const { workerData } = req.body;

  if (!workerData) {
    return res.status(400).json({ error: "No worker data received." });
  }

  const python = spawn('python3', ['server/generate_report.py', workerData]);

  python.stderr.on('data', (data) => {
    console.error(`Python error: ${data}`);
  });

  python.on('close', (code) => {
    if (code === 0) {
      res.json({ message: 'Report generated successfully.' });
    } else {
      res.status(500).json({ error: 'Python script failed.' });
    }
  });
});
