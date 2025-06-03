const express = require('express');
const { execFile } = require('child_process');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/generate-report', (req, res) => {
    const userInput = req.body.userData;

    execFile('python', ['generate_report.py', userInput], (error, stdout, stderr) => {
        if (error) {
            console.error('Error running Python script:', stderr);
            return res.status(500).json({ error: 'Internal server error' });
        }

        res.json({ report: stdout.trim() });
    });
});

app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});
