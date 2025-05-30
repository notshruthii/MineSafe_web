const express = require("express");
const dotenv = require("dotenv");
const { connectDB } = require("./db.js");
const Worker = require("./models/Worker");
const Manager = require("./models/Manager");

dotenv.config();
const app = express();
app.use(express.json());

// Connect to MongoDB
connectDB();

// Root route
app.get("/", (req, res) => {
  res.send("Server is working");
});

// Debug routes
app.get("/check-workers", async (req, res) => {
  try {
    const workers = await Worker.find();
    res.json(workers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/check-managers", async (req, res) => {
  try {
    const managers = await Manager.find();
    res.json(managers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Form Routes
app.use("/api/start-shift", require("./routes/forms/startShift"));
app.use("/api/safety-tools", require("./routes/forms/safetyTools"));
app.use("/api/task-log", require("./routes/forms/taskLog"));
app.use("/api/end-shift", require("./routes/forms/endShift"));

// Manager Dashboard Route
app.use("/api/manager", require("./routes/managerData"));

// Server Listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// API Endpoint to generate report
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