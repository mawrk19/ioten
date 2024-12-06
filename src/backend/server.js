const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Mock data for now
let temperatureData = [
    { time: '10:00', temperature: 36.5 },
    { time: '10:30', temperature: 37.2 },
    { time: '11:00', temperature: 38.0 },
];

app.get('/api/temperature-data', (req, res) => {
    res.json({
        latest: temperatureData[temperatureData.length - 1].temperature,
        historical: temperatureData,
    });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
